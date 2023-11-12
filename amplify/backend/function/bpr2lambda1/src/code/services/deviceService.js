import { v4 as uuidv4 } from 'uuid';
import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundError, DynamoDBError, BadRequestError, ApiError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

// Important for updating a device and deleting a device when the device id might be changed/undefined
const checkIfDeviceWithIdBelongsToUserWithId = async (id, userId) => {
  try {
    if (id && userId) {
      const { Item } = await dynamoDb.send(
        new GetItemCommand({
          TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
          Key: marshall({ id }),
        }),
      );

      if (!Item) {
        throw new NotFoundError(
          `Device with id ${id} does not exist. Please create it first.`,
          'src/services/deviceService.js - checkIfDeviceBelongsToUser',
        );
      } else {
        const device = unmarshall(Item);
        // Check if the device belongs to the user
        if (device.userId === userId) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - checkIfDeviceBelongsToUserWithId');
  }
};

const checkIfDeviceWithDeviceIdBelongsToUserWithId = async (deviceId, userId, shouldReturn) => {
  try {
    if (deviceId && userId) {
      const { Items } = await dynamoDb.send(
        new QueryCommand({
          TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
          IndexName: 'deviceId-index',
          KeyConditionExpression: '#deviceId = :deviceId', // Use :deviceId as a placeholder
          ExpressionAttributeValues: marshall({
            ':deviceId': deviceId, // Use :deviceId as a placeholder with a colon
          }),
          ExpressionAttributeNames: {
            '#deviceId': 'deviceId', // Map the placeholder to the actual attribute name
          },
        }),
      );

      if (Items.length !== 0) {
        const devices = Items.map((item) => unmarshall(item));
        // Check if any of the devices belong to the user
        const deviceBelongsToUser = devices.some((device) => device.userId === userId);
        if (deviceBelongsToUser) {
          if (shouldReturn) {
            return devices.find((device) => device.userId === userId);
          } else {
            return true;
          }
        }
      }
    }

    return false;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - checkIfDeviceBelongsToUserWithDeviceId');
  }
};

const createDevice = async (device, userId) => {
  try {
    if (!(await checkIfDeviceWithDeviceIdBelongsToUserWithId(device.deviceId, userId))) {
      const deviceToCreate = {
        id: uuidv4(),
        deviceId: device.deviceId,
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
    } else {
      throw new BadRequestError(
        `Device with id ${device.deviceId} already exists for this user.`,
        'src/services/deviceService.js - createDevice',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - createDevice');
  }
};

const deleteDeviceById = async (id, userId) => {
  try {
    if (await checkIfDeviceWithIdBelongsToUserWithId(id, userId)) {
      await dynamoDb.send(
        new DeleteItemCommand({
          TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
          Key: marshall({ id }),
          ConditionExpression: 'attribute_exists(id)',
        }),
      );
    } else {
      throw new NotFoundError(
        `Device with id ${id} does not exist or does not belong to user`,
        'src/services/deviceService.js - deleteDeviceById',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - deleteDeviceById');
  }
};

const updateDeviceById = async (id, userId, device) => {
  try {
    if (
      (await checkIfDeviceWithIdBelongsToUserWithId(id, userId)) &&
      //! This check is needed because the user might change the deviceId to an existing one
      !(await checkIfDeviceWithDeviceIdBelongsToUserWithId(device.deviceId, userId))
    ) {
      const deviceToUpdateKeys = Object.keys(device);

      const updateExpression = `SET ${deviceToUpdateKeys.map((key) => `#${key} = :${key}`).join(', ')}`;
      const expressionAttributeNames = deviceToUpdateKeys.reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
      const expressionAttributeValues = marshall(
        deviceToUpdateKeys.reduce((acc, key) => ({ ...acc, [`:${key}`]: device[key] }), {}),
      );

      const { Attributes: updatedDevice } = await dynamoDb.send(
        new UpdateItemCommand({
          TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
          Key: marshall({ id }),
          UpdateExpression: updateExpression,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
          ReturnValues: 'ALL_NEW',
          ConditionExpression: 'attribute_exists(id)',
        }),
      );

      // include the attributes that were not updated
      const deviceToReturn = unmarshall(updatedDevice);

      return deviceToReturn;
    } else {
      throw new BadRequestError(
        `Device doest not belong to user or deviceId {${device.deviceId}} already exists.`,
        'src/services/deviceService.js - updateDeviceById',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - updateDeviceById');
  }
};

const getHistoricalReadingsForDeviceId = async (deviceId, userId, start, end) => {
  try {
    if (await checkIfDeviceWithDeviceIdBelongsToUserWithId(deviceId, userId)) {
      const data = await dynamoDb.send(
        new QueryCommand({
          TableName: process.env.DYNAMODB_TABLE_NAME_READINGS,
          IndexName: 'deviceId-timestamp-index', // Use the name of your Global Secondary Index
          KeyConditionExpression: '#deviceId = :deviceId AND #t BETWEEN :s AND :e',
          ExpressionAttributeNames: {
            '#deviceId': 'deviceId',
            '#t': 'timestamp',
          },
          ExpressionAttributeValues: marshall(
            {
              ':deviceId': deviceId,
              ':s': parseInt(start),
              ':e': parseInt(end),
            },
            {
              removeUndefinedValues: true,
            },
          ),
          ScanIndexForward: false,
        }),
      );

      const devicesToReturn = {
        count: data.Count ?? 0,
        devices: data.Items.length > 0 ? data.Items.map((item) => unmarshall(item)) : [],
        lastEvaluatedKey: data.LastEvaluatedKey && unmarshall(data.LastEvaluatedKey),
      };

      return devicesToReturn;
    } else {
      throw new NotFoundError(
        `Could not get historical data for device with id ${deviceId}, device does not exist or does not belong to user.`,
        'src/services/deviceService.js - getHistoricalReadings',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getHistoricalReadings');
  }
};

const getCurrentReadingForDeviceId = async (deviceId, userId) => {
  try {
    if (await checkIfDeviceWithDeviceIdBelongsToUserWithId(deviceId, userId)) {
      // Retrieve all items for the specified deviceId
      const data = await dynamoDb.send(
        new QueryCommand({
          TableName: process.env.DYNAMODB_TABLE_NAME_READINGS,
          IndexName: 'deviceId-timestamp-index', // Use the name of your Global Secondary Index
          KeyConditionExpression: '#deviceId = :deviceId',
          ExpressionAttributeNames: {
            '#deviceId': 'deviceId',
          },
          ExpressionAttributeValues: marshall(
            {
              ':deviceId': deviceId,
            },
            {
              removeUndefinedValues: true,
            },
          ),
          Limit: 1,
          ScanIndexForward: false,
        }),
      );

      return data.Items.length > 0 ? unmarshall(data.Items[0]) : {}; // Return the item with the latest timestamp or empty object
    } else {
      throw new NotFoundError(
        `Could not get current readings for device with id ${deviceId}, device does not exist or does not belong to user.`,
        'src/services/deviceService.js - getCurrentReadingForDeviceId',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getCurrentReadingForDeviceId');
  }
};

const getDeviceIdsForUser = async (userId) => {
  try {
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: marshall({
          ':userId': userId,
        }),
      }),
    );

    if (!data)
      throw new NotFoundError(
        `Could not get data. No devices found for user with id ${userId}`,
        'src/services/deviceService.js - getDeviceIdsForUser',
      );

    const devicesToReturn = {
      ids: data.Items.map((item) => unmarshall(item).deviceId),
      lastEvaluatedKey: data.LastEvaluatedKey && unmarshall(data.LastEvaluatedKey),
    };

    return devicesToReturn;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getDeviceIdsForUser');
  }
};

const getDeviceInformationForDeviceId = async (deviceId, userId) => {
  const device = await checkIfDeviceWithDeviceIdBelongsToUserWithId(deviceId, userId, true);
  if (!device)
    throw new NotFoundError(
      `Could not get deivce. Device with id ${deviceId} does not exist or does not belong to user.`,
      'src/services/deviceService.js - getDeviceInformationForDeviceId',
    );

  return device;
};

export const deviceServices = {
  createDevice,
  updateDeviceById,
  deleteDeviceById,
  getDeviceIdsForUser,
  getCurrentReadingForDeviceId,
  getDeviceInformationForDeviceId,
  getHistoricalReadingsForDeviceId,
  checkIfDeviceWithIdBelongsToUserWithId,
  checkIfDeviceWithDeviceIdBelongsToUserWithId,
};
