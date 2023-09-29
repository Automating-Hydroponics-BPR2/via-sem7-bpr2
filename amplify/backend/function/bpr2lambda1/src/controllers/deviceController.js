import { deviceServices } from '../services/deviceService.js';

export const getAllDevices = async (req, res, next) => {
  const devices = await deviceServices.getAllDevices();
  res.status(200).json(devices);
  next();
};

export const createDevice = async (req, res, next) => {
  const { body: device } = req;
  const createdDevice = await deviceServices.createDevice(device);
  res.status(201).json(createdDevice);
  next();
};

export const getDeviceById = async (req, res, next) => {
  try {
    console.log('getDeviceById');
    const { deviceId } = req.params;
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
