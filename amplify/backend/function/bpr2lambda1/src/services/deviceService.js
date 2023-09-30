import { v4 as uuidv4 } from 'uuid';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundError, DynamoDbError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const createDevice = async (device) => {
  try {
    const deviceToCreate = {
      id: uuidv4(),
      name: device.name,
      type: device.type,
      reading: device.reading,
      dateTime: device.dateTime,
    };

    await dynamoDb.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: marshall(deviceToCreate),
      }),
    );

    return deviceToCreate;
  } catch (error) {
    throw new DynamoDbError(error, 'src/services/deviceService.js - createDevice');
  }
};

const getDeviceById = async (deviceId) => {
  try {
    const { Item } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id: deviceId }),
      }),
    );

    if (!Item) {
      throw new NotFoundError(
        `Could not get device with id ${deviceId}, device not found`,
        'src/services/deviceService.js - getDeviceById',
      );
    }

    return unmarshall(Item);
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    else throw new DynamoDbError(error, 'src/services/deviceService.js - getDeviceById');
  }
};

const deleteDeviceById = async (deviceId) => {
  try {
    const { Item } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id: deviceId }),
      }),
    );

    if (!Item) {
      throw new NotFoundError(
        `Could not delete device with id ${deviceId}, device not found`,
        'src/services/deviceService.js - deleteDeviceById',
      );
    }

    await dynamoDb.send(
      new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id: deviceId }),
      }),
    );
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    else throw new DynamoDbError(error, 'src/services/deviceService.js - deleteDeviceById');
  }
};

const updateDeviceById = async (deviceId, device) => {
  try {
    const { Item } = await dynamoDb.send(
      new GetItemCommand({ TableName: process.env.DYNAMODB_TABLE_NAME, Key: marshall({ id: deviceId }) }),
    );

    if (!Item) {
      throw new NotFoundError(
        `Could not update device with id ${deviceId}, device not found`,
        'src/services/deviceService.js - updateDeviceById',
      );
    }

    const deviceToUpdateKeys = Object.keys(unmarshall(Item));

    // Filter out keys that don't exist in the DynamoDB table
    const validDeviceAttributes = Object.keys(device).filter((key) => deviceToUpdateKeys.includes(key));

    const updateExpression = `SET ${validDeviceAttributes.map((key) => `#${key} = :${key}`).join(', ')}`;
    const expressionAttributeNames = validDeviceAttributes.reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
    const expressionAttributeValues = marshall(
      validDeviceAttributes.reduce((acc, key) => ({ ...acc, [`:${key}`]: device[key] }), {}),
    );

    await dynamoDb.send(
      new UpdateItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id: deviceId }),
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      }),
    );

    const { Item: updatedItem } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ id: deviceId }),
      }),
    );

    return unmarshall(updatedItem);
  } catch (error) {
    if (error instanceof NotFoundError) throw error;
    else throw new DynamoDbError(error, 'src/services/deviceService.js - updateDeviceById');
  }
};

const getAllDevices = async (start, limit) => {
  try {
    // start can be undefined, so we need to check if it exists
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Limit: limit,
        ExclusiveStartKey: start && marshall({ id: start }),
      }),
    );

    if (!data)
      throw new NotFoundError(
        `Could not get all devices, no data found`,
        'src/services/deviceService.js - getAllDevices',
      );

    const devicesToReturn = {
      devices: data.Items.map((item) => unmarshall(item)),
      count: data.Count,
      lastEvaluatedKey: data.LastEvaluatedKey && unmarshall(data.LastEvaluatedKey),
    };

    return devicesToReturn;
  } catch (error) {
    throw new DynamoDbError(error, 'src/services/deviceService.js - getAllDevices');
  }
};

export const deviceServices = {
  createDevice,
  getDeviceById,
  deleteDeviceById,
  updateDeviceById,
  getAllDevices,
};
