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
import { NotFoundError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const createDevice = async (device) => {
  const { Attributes } = await dynamoDb.send(
    new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall({
        id: uuidv4(),
        name: device.name,
        type: device.type,
        reading: device.reading,
        dateTime: device.dateTime,
      }),
      ReturnValues: 'ALL_OLD',
    }),
  );

  return unmarshall(Attributes);
};

const getDeviceById = async (deviceId) => {
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
};

const deleteDeviceById = async (deviceId) => {
  const { Item } = await dynamoDb.send(
    new GetItemCommand({ TableName: process.env.DYNAMODB_TABLE_NAME, Key: marshall({ id: deviceId }) }),
  );

  if (!Item) {
    throw new NotFoundError(
      `Could not delete device with id ${deviceId}, device not found`,
      'src/services/deviceService.js - deleteDeviceById',
    );
  }

  await dynamoDb.send(
    new DeleteItemCommand({ TableName: process.env.DYNAMODB_TABLE_NAME, Key: marshall({ id: deviceId }) }),
  );
};

const updateDeviceById = async (deviceId, device) => {
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
};

const getAllDevices = async (limit, take) => {
  const devices = await dynamoDb.send(
    new ScanCommand({ TableName: process.env.DYNAMODB_TABLE_NAME, Limit: limit, TotalSegments: take }),
  );

  return devices.Items.map((device) => unmarshall(device));
};

export const deviceServices = {
  createDevice,
  getDeviceById,
  deleteDeviceById,
  updateDeviceById,
  getAllDevices,
};
