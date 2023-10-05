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

const checkIfUsernameExists = async (username, isReturnSpecified) => {
  try {
    const { Items } = await dynamoDb.send(
      new QueryCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        IndexName: 'username-index',
        KeyConditionExpression: '#username = v_username',
        ExpressionAttributeNames: {
          '#username': 'username',
        },
        ExpressionAttributeValues: marshall({
          v_username: username,
        }),
      }),
    );

    const userWithUsername = Items.find((item) => unmarshall(item).username === username);

    if (userWithUsername) {
      if (isReturnSpecified) {
        return userWithUsername;
      } else {
        throw new BadRequestError(
          `User with username ${username}, username already exists`,
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
    return userToReturn;
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
        `Could not login user with username ${user.username}, wrong password`,
        'src/services/userService.js - loginUser',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - loginUser');
  }
};

const deleteUserById = async (token) => {
  try {
    const { id: userId } = jwt.verify(token, process.env.SECRETS_JWT);
    const { Item } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ id: userId }),
      }),
    );

    if (!Item) {
      throw new NotFoundError(
        `Could not delete user with id ${userId}, user not found`,
        'src/services/userService.js - deleteUserById',
      );
    }

    await dynamoDb.send(
      new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ id: userId }),
      }),
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - deleteUserById');
  }
};

const updateUserById = async (token, user) => {
  try {
    const { id: userId } = jwt.verify(token, process.env.SECRETS_JWT);
    const { Item } = await dynamoDb.send(
      new GetItemCommand({ TableName: process.env.DYNAMODB_TABLE_NAME_USERS, Key: marshall({ id: userId }) }),
    );

    if (!Item) {
      throw new NotFoundError(
        `Could not update user with id ${userId}, user not found`,
        'src/services/userService.js - updateUserById',
      );
    }

    const userToUpdateKeys = Object.keys(unmarshall(Item));

    // Filter out keys that don't exist in the DynamoDB table
    const validUserAttributes = Object.keys(user).filter((key) => userToUpdateKeys.includes(key));

    const updateExpression = `SET ${validUserAttributes.map((key) => `#${key} = :${key}`).join(', ')}`;
    const expressionAttributeNames = validUserAttributes.reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
    const expressionAttributeValues = marshall(
      validUserAttributes.reduce((acc, key) => ({ ...acc, [`:${key}`]: user[key] }), {}),
    );

    await dynamoDb.send(
      new UpdateItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ id: userId }),
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      }),
    );

    const { Item: updatedItem } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ id: userId }),
      }),
    );

    return unmarshall(updatedItem);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - updateUserById');
  }
};

export const userServices = {
  registerUser,
  loginUser,
  deleteUserById,
  updateUserById,
};
