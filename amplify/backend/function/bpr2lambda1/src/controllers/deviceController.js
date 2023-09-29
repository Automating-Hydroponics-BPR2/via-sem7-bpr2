import { deviceServices } from '../services/deviceService.js';
import { ApiError, BadRequestError } from '../helpers/apiError.js';

export const getAllDevices = async (req, res, next) => {
  try {
    const devices = await deviceServices.getAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(new ApiError(500, `Internal Server Error, ${error}`, 'src/controllers/deviceController.js - getAllDevices'));
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
      next(new ApiError(500, `Internal Server Error, ${error}`, 'src/controllers/deviceController.js - createDevice'));
    }
  }
};

export const updateDeviceById = async (req, res, next) => {
  try {
    const { body: device } = req;
    const { deviceId } = req.params;
    const updatedDevice = await deviceServices.updateDeviceById(deviceId, device);
    res.status(200).json(updatedDevice);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(new ApiError(500, `Internal Server Error, ${error}`, 'src/controllers/deviceController.js - updateDeviceById'));
    }
  }
}

export const deleteDeviceById = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    await deviceServices.deleteDeviceById(deviceId);
    res.status(204).json();
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(new ApiError(500, `Internal Server Error, ${error}`, 'src/controllers/deviceController.js - deleteDeviceById'));
    }
  }
}

export const getDeviceById = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    console.log('getDeviceById', deviceId);
    const device = await deviceServices.getDeviceById(deviceId);
    res.status(200).json(device);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(new ApiError(500, `Internal Server Error, ${error}`, 'src/controllers/deviceController.js - getDeviceById'));
    }
  }
};