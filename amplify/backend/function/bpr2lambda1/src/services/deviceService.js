import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const createDevice = async (device) => {
  const params = {
    TableName: 'Devices',
    Item: {
      id: uuidv4(),
      name: device.name,
      type: device.type,
      reading: device.reading,
      dateTime: device.dateTime,
    },
  };
  await dynamoDb.put(params).promise();

  return device;
};

const findById = async (deviceId) => {
  console.log('Device findById: ', deviceId);
  const deviceToReturn = {
    id: deviceId,
    name: 'Device 1',
    type: 'Device Type 1',
    reading: 'Device Reading 1',
    dateTime: 'Device DateTime 1',
  };
  return deviceToReturn;
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
  //   const params = {
  //     TableName: 'Devices',
  //   };
  //   const devices = await dynamoDb.scan(params).promise();
  return devices;
};

export const deviceServices = {
  createDevice,
  findById,
  getAllDevices,
};
