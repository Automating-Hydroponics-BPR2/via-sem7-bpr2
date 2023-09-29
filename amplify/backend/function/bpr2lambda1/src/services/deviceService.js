import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, ListTablesCommand, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
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

    const deviceCreated = await dynamoDb.send(
      new PutItemCommand({
        TableName: 'devices-dev',
        Item: {
          id: { S: deviceToCreate.id },
          name: { S: deviceToCreate.name },
          type: { S: deviceToCreate.type },
          reading: { S: deviceToCreate.reading },
          dateTime: { S: deviceToCreate.dateTime },
        },
      }),
    );

    return deviceCreated;
  } catch (error) {
    console.log('Device creation error: ', error);
  }
};

const getDeviceById = async (deviceId) => {
  try {
    console.log('Device findById: ', deviceId);
    const deviceToFetch = await dynamoDb.send(
      new GetItemCommand({ TableName: 'devices-dev', Key: { id: { S: deviceId } } }),
    );
    const deviceToReturn = {
      id: deviceId,
      name: 'Device 1',
      type: 'Device Type 1',
      reading: 'Device Reading 1',
      dateTime: 'Device DateTime 1',
    };

    return deviceToFetch ?? deviceToReturn;
  } catch (error) {
    console.log('Device findById error: ', error);
  }
};

const getAllDevices = async () => {
  try {
    const devices = await dynamoDb.send(
      new ListTablesCommand({
        TableName: 'devices-dev',
      }),
    );
    return devices;
  } catch (error) {
    console.log('getAllDevices error: ', error);
  }
};

export const deviceServices = {
  createDevice,
  findById: getDeviceById,
  getAllDevices,
};
