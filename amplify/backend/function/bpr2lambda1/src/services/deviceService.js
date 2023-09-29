import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const TableParams = {
  TableName: 'devices-dev',
};

const createDevice = async (device) => {
  try {
    const deviceToCreate = {
      id: uuidv4(),
      name: device.name,
      type: device.type,
      reading: device.reading,
      dateTime: device.dateTime,
    };

    const deviceCreated = await dynamoDb.put(Object.assign(TableParams, deviceToCreate)).promise();

    return deviceCreated;
  } catch (error) {
    return error;
  }
};

const getDeviceById = async (deviceId) => {
  console.log('Device findById: ', deviceId);
  const deviceToFetch = await dynamoDb
    .get({
      TableName: 'Devices',
      Key: {
        id: deviceId,
      },
    })
    .promise();
  const deviceToReturn = {
    id: deviceId,
    name: 'Device 1',
    type: 'Device Type 1',
    reading: 'Device Reading 1',
    dateTime: 'Device DateTime 1',
  };

  return deviceToFetch ?? deviceToReturn;
};

const getAllDevices = async () => {
  const devices = [
    {
      id: '1',
      name: 'Device 1',
      type: 'Device Type 1',
      reading: 'Device Reading 1',
      dateTime: 'Device DateTime 1',
    },
    {
      id: '2',
      name: 'Device 2',
      type: 'Device Type 2',
      reading: 'Device Reading 2',
      dateTime: 'Device DateTime 2',
    },
    {
      id: '3',
      name: 'Device 3',
      type: 'Device Type 3',
      reading: 'Device Reading 3',
      dateTime: 'Device DateTime 3',
    },
  ];
  
  const tables = await dynamoDb.send(new ListTablesCommand({}));
  return tables ?? devices;
};

export const deviceServices = {
  createDevice,
  findById: getDeviceById,
  getAllDevices,
};
