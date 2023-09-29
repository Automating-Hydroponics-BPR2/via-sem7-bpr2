// deviceController.js
import { deviceServices } from '../services/deviceService.js';

export const getAllDevices = async (event, req, res, next) => {
  const devices = await deviceServices.getAllDevices();
  res.status(200).json(devices);
  next();
};

export const createDevice = async (event, req, res, next) => {
  const device = JSON.parse(event.body);
  const createdDevice = await deviceServices.createDevice(device);
  res.status(201).json(createdDevice);
  next();
};

export const getDeviceById = async (event, req, res, next) => {
  try {
    console.log(event, req, res, next);
    const { deviceId } = event.pathParameters;
    const device = await deviceServices.findById(deviceId);
    res.status(200).json(device);
    next();
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'test-header': 'test',
      },
      body: JSON.stringify(error),
    };
  }
};
