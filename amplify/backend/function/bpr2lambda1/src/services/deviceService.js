import { v4 as uuidv4 } from 'uuid';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { NotFoundError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const createDevice = async (device) => {
  const deviceCreated = await dynamoDb.send(
    new PutItemCommand({
      TableName: 'devices-dev',
      Item: {
        id: { S: uuidv4() },
        name: { S: device.name },
        type: { S: device.type },
        reading: { S: device.reading },
        dateTime: { S: device.dateTime },
      },
    }),
  );

  return deviceCreated;
};

const getDeviceById = async (deviceId) => {
  console.log('Device findById: ', deviceId);
  const deviceToFetch = await dynamoDb.send(
    new GetItemCommand({ TableName: 'devices-dev', Key: { id: { S: deviceId } } }),
  );

  if (!deviceToFetch) {
    throw new NotFoundError(`Device with id ${deviceId} not found`, 'src/services/deviceService.js - getDeviceById');
  }

  return deviceToFetch;
};

const deleteDeviceById = async (deviceId) => {
  const deviceToDelete = await dynamoDb.send(
    new GetItemCommand({ TableName: 'devices-dev', Key: { id: { S: deviceId } } }),
  );

  if (!deviceToDelete) {
    throw new NotFoundError(`Device with id ${deviceId} not found`, 'src/services/deviceService.js - deleteDeviceById');
  }

  await dynamoDb.send(new DeleteItemCommand({ TableName: 'devices-dev', Key: { id: { S: deviceId } } }));
};

const updateDeviceById = async (deviceId, device) => {
  const deviceToUpdate = await dynamoDb.send(
    new GetItemCommand({ TableName: 'devices-dev', Key: { id: { S: deviceId } } }),
  );

  if (!deviceToUpdate) {
    throw new NotFoundError(`Device with id ${deviceId} not found`, 'src/services/deviceService.js - updateDeviceById');
  }

  await dynamoDb.send(
    new UpdateItemCommand({
      TableName: 'devices-dev',
      Key: { id: { S: deviceId } },
      UpdateExpression: 'set name = :n, type = :t, reading = :r, dateTime = :d',
      ExpressionAttributeValues: {
        ':n': { S: device.name },
        ':t': { S: device.type },
        ':r': { S: device.reading },
        ':d': { S: device.dateTime },
      },
    }),
  );

  const deviceUpdated = await dynamoDb.send(
    new GetItemCommand({ TableName: 'devices-dev', Key: { id: { S: deviceId } } }),
  );

  return deviceUpdated;
};

const getAllDevices = async (take, limit) => {
  const devices = await dynamoDb.send(new ScanCommand({ TableName: 'devices-dev', Limit: limit, TotalSegments: take }));

  return devices;
};

export const deviceServices = {
  createDevice,
  getDeviceById,
  deleteDeviceById,
  updateDeviceById,
  getAllDevices,
};
