import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import jwt from 'jsonwebtoken';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundError, DynamoDBError, BadRequestError, InternalServerError, ApiError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const checkIfDeviceBelongsToUser = async (deviceId, token, isReturnSpecified) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { Item } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        Key: marshall({ id: deviceId }),
      }),
    );

    if (!Item) {
      throw new NotFoundError(
        `Could not get device with id ${deviceId}, device not found`,
        'src/services/deviceService.js - checkIfDeviceBelongsToUser',
      );
    }

    const device = unmarshall(Item);

    if (device.userId !== userId) {
      throw new BadRequestError(
        `Device with id ${deviceId} does not belong to user`,
        'src/services/deviceService.js - checkIfDeviceBelongsToUser',
      );
    }

    return isReturnSpecified ? device : null;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - checkIfDeviceBelongsToUser');
  }
};

const createDevice = async (device, token) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { Item } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        Key: marshall({ id: device.id }),
      }),
    );

    if (Item) {
      throw new BadRequestError(
        `Could not create device with id ${device.id}, device already exists`,
        'src/services/deviceService.js - createDevice',
      );
    }

    const deviceToCreate = {
      id: device.id,
      name: device.name ? device.name : 'Unnamed Device',
      userId,
    };

    await dynamoDb.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        Item: marshall(deviceToCreate),
      }),
    );

    return deviceToCreate;
  } catch (error) {
    throw new DynamoDBError(error, 'src/services/deviceService.js - createDevice');
  }
};

const deleteDeviceById = async (deviceId, token) => {
  try {
    await checkIfDeviceBelongsToUser(deviceId, token);

    await dynamoDb.send(
      new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        Key: marshall({ id: deviceId }),
      }),
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new InternalServerError(error, 'src/services/deviceService.js - deleteDeviceById');
  }
};

const updateDeviceById = async (deviceId, userId, device) => {
  try {
    const { Item } = await checkIfDeviceBelongsToUser(deviceId, userId, true);

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
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        Key: marshall({ id: deviceId }),
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      }),
    );

    const { Item: updatedItem } = await dynamoDb.send(
      new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        Key: marshall({ id: deviceId }),
      }),
    );

    return unmarshall(updatedItem);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - updateDeviceById');
  }
};

const getHistoricalReadings = async (deviceId, token, type, start, end) => {
  try {
    await checkIfDeviceBelongsToUser(deviceId, token);

    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_READINGS,
        FilterExpression: !type
          ? '#timestamp BETWEEN :start AND :end'
          : '#timestamp BETWEEN :start AND :end AND #type = :type',
        ExpressionAttributeNames: {
          '#timestamp': 'timestamp',
        },
        ExpressionAttributeValues: marshall({
          ':start': start,
          ':end': end,
        }),
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
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getAllDevices');
  }
};

const getCurrentReadings = async (deviceId, token) => {
  try {
    // Check if the device belongs to the user
    await checkIfDeviceBelongsToUser(deviceId, token);

    // Retrieve the item with the latest timestamp from TABMEL_NAME_READINGS
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_READINGS,
        KeyConditionExpression: 'deviceId = :deviceId',
        ExpressionAttributeValues: marshall({
          ':deviceId': deviceId,
        }),
        ScanIndexForward: false, // Sort in descending order to get the latest reading first
        Limit: 1, // Limit to one result
      }),
    );

    if (!data || !data.Items || data.Items.length === 0) {
      throw new NotFoundError(
        `Could not get current readings for device with id ${deviceId}, no readings found`,
        'src/services/deviceService.js - getCurrentReadings',
      );
    }

    return unmarshall(data.Items[0]);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getCurrentReadings');
  }
};

export const deviceServices = {
  createDevice,
  updateDeviceById,
  deleteDeviceById,
  getHistoricalReadings,
  getCurrentReadings,
};
