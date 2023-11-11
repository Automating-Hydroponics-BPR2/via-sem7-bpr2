import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundError, DynamoDBError, BadRequestError, UnauthorizedError, ApiError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const queryForUserWithUsername = async (username) => {
  try {
    if (username) {
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

      if (Items.length === 1) {
        return unmarshall(Items[0]);
      }

      return null;
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, `src/services/userService.js - ${username} - queryForUserWithUsername`);
  }
};

const checkIfUserWithIdExists = async (userId) => {
  try {
    const { Item: user } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ id: userId }),
      }),
    );

    if (user) {
      return true;
    }

    return false;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, `src/services/userService.js - ${userId} - checkIfUserWithIdExists`);
  }
};

const checkIfUserWithUsernameExists = async (username) => {
  try {
    const user = await queryForUserWithUsername(username);
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, `src/services/userService.js - ${username} - checkIfUsernameExists`);
  }
};

const registerUser = async (user) => {
  try {
    if (!(await checkIfUserWithUsernameExists(user.username))) {
      const hashedPassword = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
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

      const token = jwt.sign(
        {
          id: userToCreate.id,
          username: userToCreate.username,
          email: userToCreate.email,
          firstName: userToCreate.firstName,
          lastName: userToCreate.lastName,
        },
        process.env.SECRETS_JWT,
        { expiresIn: '1h' },
      );

      return { token };
    } else {
      throw new BadRequestError(
        `Could not register user with username ${user.username}, username already exists. Please try again`,
        'src/services/userService.js - registerUser',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/userService.js - createUser');
  }
};

const loginUser = async (user) => {
  try {
    const userToReturn = await queryForUserWithUsername(user.username);
    if (userToReturn) {
      console.log('loginUser, userToReturn, point of debug', userToReturn);
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
    } else {
      throw new NotFoundError(
        `Could not login user with username ${user.username}, user does not exist. Please try again`,
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

const updateUserById = async (userId, user) => {
  try {
    if ((await checkIfUserWithIdExists(userId)) && !(await checkIfUserWithUsernameExists(user.username))) {
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

      // include the attributes that were not updated except the password if it existed in the request body
      const { password, ...userToReturn } = { ...unmarshall(updatedUser), ...user };
      console.log(userToReturn);
      return userToReturn;
    } else {
      throw new NotFoundError(
        `Could not update user with id ${userId}, user does not exist or username already taken. Please try again`,
        'src/services/userService.js - updateUserById',
      );
    }
  } catch (error) {
    if (error.name === 'ConditionalCheckFailedException')
      throw new NotFoundError(error.message, 'src/services/userService.js - updateUserById');
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - updateUserById');
  }
};

export const userServices = {
  queryForUserWithUsername,
  registerUser,
  loginUser,
  deleteUserById,
  updateUserById,
};
