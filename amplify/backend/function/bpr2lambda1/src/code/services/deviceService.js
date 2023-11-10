import { v4 as uuidv4 } from 'uuid';
import {
  DynamoDBClient,
  QueryCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NotFoundError, DynamoDBError, BadRequestError, InternalServerError, ApiError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const checkIfDeviceIdIsTaken = async (deviceId) => {
  try {
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
        /*
                  {
            removeUndefinedValues: true,
          },
        */
      }),
    );

    if (Items.length !== 0) {
      throw new BadRequestError(
        `Device with id ${deviceId} already exists. Try another id.`,
        'src/services/deviceService.js - checkIfDeviceIdExists',
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, `src/services/deviceService.js - ${deviceId} - checkIfDeviceIdExists`);
  }
};

const checkIfDeviceIdExistsAndBelongsToUser = async (deviceId, userId, shouldDeviceExist, isReturnSpecified) => {
  try {
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

    if (shouldDeviceExist) {
      if (Items.length === 0) {
        throw new NotFoundError(
          `Device with id ${deviceId} does not exist. Please create it first.`,
          'src/services/deviceService.js - checkIfDeviceBelongsToUser',
        );
      } else {
        const device = unmarshall(Items[0]);
        // Check if the device belongs to the user
        if (device.userId !== userId) {
          throw new BadRequestError(
            `Device with id ${deviceId} does not belong to user`,
            'src/services/deviceService.js - checkIfDeviceBelongsToUser',
          );
        } else if (isReturnSpecified) {
          return device;
        }
      }
    } else {
      if (Items.length !== 0) {
        throw new BadRequestError(
          `Device with id ${deviceId} already exists. Try another id.`,
          'src/services/deviceService.js - checkIfDeviceBelongsToUser',
        );
      }
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - checkIfDeviceBelongsToUser');
  }
};

const createDevice = async (device, userId) => {
  try {
    await checkIfDeviceIdIsTaken(device.deviceId);
    console.log('point of debug 1', device);

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
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - createDevice');
  }
};

const deleteDeviceById = async (id, userId) => {
  try {
    await dynamoDb.send(
      new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_DEVICES,
        Key: marshall({ id }),
      }),
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new InternalServerError(error, 'src/services/deviceService.js - deleteDeviceById');
  }
};

const updateDeviceById = async (id, userId, device) => {
  try {
    console.log('point of debug 1', id);
    await checkIfDeviceIdIsTaken(device.deviceId);
    console.log('point of debug 2', userId);

    const deviceToUpdateKeys = Object.keys(device);

    const updateExpression = `SET ${deviceToUpdateKeys.map((key) => `#${key} = :${key}`).join(', ')}`;
    const expressionAttributeNames = deviceToUpdateKeys.reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
    const expressionAttributeValues = marshall(
      deviceToUpdateKeys.reduce((acc, key) => ({ ...acc, [`:${key}`]: device[key] }), {}),
    );

    console.log('point of debug 3', updateExpression, expressionAttributeNames, expressionAttributeValues);

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
    console.log('point of debug 3', deviceToReturn);

    return deviceToReturn;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    else throw new DynamoDBError(error, 'src/services/deviceService.js - updateDeviceById');
  }
};

const getHistoricalReadings = async (deviceId, userId, start, end) => {
  try {
    // TODO still cannot get historical readings
    console.log('point of debug 1 historical readings', deviceId);
    await checkIfDeviceIdExistsAndBelongsToUser(deviceId, userId, true);

    console.log('point of debug 2 historical readings', deviceId, start, end);

    const data = await dynamoDb.send(
      new QueryCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_READINGS,
        IndexName: 'deviceId-timestamp-index', // Use the name of your Global Secondary Index
        KeyConditionExpression: '#deviceId = :deviceId AND #t BETWEEN :e AND :s',
        ExpressionAttributeNames: {
          '#deviceId': 'deviceId',
          '#t': 'timestamp',
        },
        ExpressionAttributeValues: marshall(
          {
            ':deviceId': deviceId,
            ':s': start,
            ':e': end,
          },
          {
            removeUndefinedValues: true,
          },
        ),
        ScanIndexForward: false,
      }),
    );

    console.log(data);

    if (!data)
      throw new NotFoundError(
        `Could not get data. No readings found for device with id ${deviceId} between ${start} and ${end}`,
        'src/services/deviceService.js - getHistoricalReadings',
      );

    const devicesToReturn = {
      devices: data.Items.map((item) => unmarshall(item)),
      count: data.Count,
      lastEvaluatedKey: data.LastEvaluatedKey && unmarshall(data.LastEvaluatedKey),
    };

    return devicesToReturn;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getHistoricalReadings');
  }
};

const getCurrentReadings = async (deviceId, userId) => {
  console.log('point of debug 1 current readings', deviceId);
  try {
    // Check if the device belongs to the user
    await checkIfDeviceIdExistsAndBelongsToUser(deviceId, userId, true);

    console.log('point of debug 2 current readings', deviceId);
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

    if (!data || !data.Items || data.Items.length === 0) {
      throw new NotFoundError(
        `Could not get current readings for device with id ${deviceId}, no readings found`,
        'src/services/deviceService.js - getCurrentReadings',
      );
    }

    console.log(data.Items[0]);

    return unmarshall(data.Items[0]); // Return the item with the latest timestamp
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getCurrentReadings');
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

    console.log(data);

    if (!data)
      throw new NotFoundError(
        `Could not get data. No devices found for user with id ${userId}`,
        'src/services/deviceService.js - getAllDevices',
      );

    const devicesToReturn = {
      ids: data.Items.map((item) => unmarshall(item).deviceId),
      lastEvaluatedKey: data.LastEvaluatedKey && unmarshall(data.LastEvaluatedKey),
    };

    return devicesToReturn;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getAllDevices');
  }
};

const getDeviceInformationForId = async (deviceId, userId) => {
  try {
    // Check if the device belongs to the user
    const device = await checkIfDeviceIdExistsAndBelongsToUser(deviceId, userId, true, true);

    console.log(device);

    if (!device) {
      throw new NotFoundError(
        `Could not get device information for device with id ${deviceId}, no device found`,
        'src/services/deviceService.js - getDeviceInformation',
      );
    }

    return device;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - getDeviceInformation');
  }
};

export const deviceServices = {
  createDevice,
  updateDeviceById,
  deleteDeviceById,
  getHistoricalReadings,
  getCurrentReadings,
  getDeviceIdsForUser,
  getDeviceInformationForId,
};
