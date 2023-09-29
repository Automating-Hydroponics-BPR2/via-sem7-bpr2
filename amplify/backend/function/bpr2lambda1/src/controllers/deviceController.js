import { deviceServices } from '../services/deviceService.js';
import { BadRequestError } from '../helpers/apiError.js';

export const getAllDevices = async (req, res, next) => {
  try {
    const devices = await deviceServices.getAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(error);
    }
  }
};

export const createDevice = async (req, res, next) => {
  try {
    const { body: device } = req;
    const createdDevice = await deviceServices.createDevice(device);
    res.status(201).json(createdDevice);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(error);
    }
  }
};

export const getDeviceById = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    console.log('getDeviceById', deviceId);
    const device = await deviceServices.findById(deviceId);
    res.status(200).json(device);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(error);
    }
  }
};
