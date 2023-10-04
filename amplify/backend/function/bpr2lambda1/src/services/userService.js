import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundError, DynamoDBError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const registerUser = async (user) => {
  try {
    const userToCreate = {
      id: uuidv4(),
      username: user.username,
      email: user.email,
      password: await bcrypt.hash(user.password, bcrypt.genSaltSync(10)),
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
    throw new DynamoDBError(error, 'src/services/userService.js - createUser');
  }
};

const loginUser = async (user) => {
  try {
    const userToLogin = {
      username: user.username,
      password: user.password,
    };

    const { Item } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_USERS,
        Key: marshall({ username: userToLogin.username }),
      }),
    );

    if (!Item) {
      throw new NotFoundError(
        `Could not get user with username ${userToLogin.username}, user not found`,
        'src/services/userService.js - loginUser',
      );
    }

    const userToReturn = unmarshall(Item);

    if (await bcrypt.compare(userToLogin.password, userToReturn.password)) {
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
      throw new NotFoundError(
        `Could not login user with username ${userToLogin.username}, wrong password`,
        'src/services/userService.js - loginUser',
      );
    }
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
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
    if (error instanceof NotFoundError) throw error;
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
    if (error instanceof NotFoundError) throw error;
    else throw new DynamoDBError(error, 'src/services/userService.js - updateUserById');
  }
};

export const userServices = {
  registerUser,
  loginUser,
  deleteUserById,
  updateUserById,
};
