import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  DynamoDBClient,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundError, DynamoDBError, BadRequestError, UnauthorizedError, ApiError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const checkIfUsernameExists = async (username, isReturnSpecified) => {
  try {
    const { Items } = await dynamoDb.send(
      new QueryCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        IndexName: 'username-index',
        KeyConditionExpression: '#username = :username', // Use :username as a placeholder
        ExpressionAttributeValues: marshall({
          ':username': username, // Use :username as a placeholder with a colon
        }),
        ExpressionAttributeNames: {
          '#username': 'username', // Map the placeholder to the actual attribute name
        },
      }),
    );

    if (isReturnSpecified) {
      if (Items.length === 0) {
        throw new NotFoundError(
          `User with username ${username} is not registered. No items returned from DynamoDB query`,
          'src/services/userService.js - checkIfUsernameExists',
        );
      } else {
        return unmarshall(Items[0]);
      }
    } else {
      if (Items.length !== 0) {
        throw new BadRequestError(
          `User with username ${username} already exists. Try another username`,
          'src/services/userService.js - checkIfUsernameExists',
        );
      }
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, `src/services/userService.js - ${username} - checkIfUsernameExists`);
  }
};

const registerUser = async (user) => {
  await checkIfUsernameExists(user.username);

  const hashedPassword = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));

  try {
    const userToCreate = {
      id: uuidv4(),
      username: user.username,
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    await dynamoDb.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Item: marshall(userToCreate),
      }),
    );

    // return the userToCreate object without the password
    const { password, ...userToReturn } = userToCreate;

    return unmarshall(userToReturn);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/userService.js - createUser');
  }
};

const loginUser = async (user) => {
  try {
    const userToReturn = await checkIfUsernameExists(user.username, true);
    const isPasswordCorrect = bcrypt.compareSync(user.password, userToReturn.password);

    if (isPasswordCorrect) {
      const token = jwt.sign(
        {
          id: userToReturn.id,
          username: userToReturn.username,
          email: userToReturn.email,
          firstName: userToReturn.firstName,
          lastName: userToReturn.lastName,
        },
        process.env.SECRETS_JWT,
        { expiresIn: '1h' },
      );

      return { token };
    } else {
      throw new UnauthorizedError(
        `Could not login user with username ${user.username}, wrong password. Please try again`,
        'src/services/userService.js - loginUser',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - loginUser');
  }
};

const deleteUserById = async (userId) => {
  try {
    await dynamoDb.send(
      new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ id: userId }),
        ConditionExpression: 'attribute_exists(id)',
      }),
    );
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException')
      throw new NotFoundError(error.message, 'src/services/userService.js - deleteUserById');
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - deleteUserById');
  }
};

const updateUserById = async (user, userId) => {
  try {
    console.log('user', user);
    // more information > https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/command/UpdateItemCommand/
    const userAttributes = Object.keys(user);

    const updateExpression = `SET ${userAttributes.map((key) => `#${key} = :${key}`).join(', ')}`;
    const expressionAttributeNames = userAttributes.reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
    const expressionAttributeValues = marshall(
      userAttributes.reduce((acc, key) => ({ ...acc, [`:${key}`]: user[key] }), {}),
      {
        removeUndefinedValues: true,
      },
    );

    const { Attributes: updatedUser } = await dynamoDb.send(
      new UpdateItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ id: userId }),
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'UPDATED_NEW',
        ConditionExpression: 'attribute_exists(id)',
      }),
    );

    console.log('updatedUser', updatedUser);

    // include the attributes that were not updated except the password if it existed in the request body
    const { password, ...userToReturn } = { ...unmarshall(updatedUser), ...user };

    console.log('userToReturn', userToReturn);

    return userToReturn;
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException')
      throw new NotFoundError(error.message, 'src/services/userService.js - updateUserById');
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - updateUserById');
  }
};

export const userServices = {
  checkIfUsernameExists,
  registerUser,
  loginUser,
  deleteUserById,
  updateUserById,
};
