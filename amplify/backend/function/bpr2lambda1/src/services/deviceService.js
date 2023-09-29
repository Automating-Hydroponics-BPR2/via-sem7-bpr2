import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
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
    throw new NotFoundError(`Device with id ${deviceId} not found`);
  }

  return deviceToFetch;
};

const getAllDevices = async () => {
  const devices = await dynamoDb.send(
    new ListTablesCommand({
      TableName: 'devices-dev',
    }),
  );

  return devices ?? [];
};

export const deviceServices = {
  createDevice,
  findById: getDeviceById,
  getAllDevices,
};
