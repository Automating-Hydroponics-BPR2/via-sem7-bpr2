import { deviceServices } from '../services/deviceService.js';
import { ApiError, BadRequestError, NotFoundError } from '../helpers/apiError.js';

export const getAllDevices = async (req, res, next) => {
  try {
    const { limit, take } = req.query;
    const devices = await deviceServices.getAllDevices(limit, take);
    res.status(200).json(devices);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error, 'src/controllers/deviceController.js - getAllDevices'));
    } else {
      next(new ApiError(error, 'src/controllers/deviceController.js - getAllDevices', 500));
    }
  }
};

export const createDevice = async (req, res, next) => {
  try {
    const { body: device } = req;
    const createdDevice = await deviceServices.createDevice(device);
    res.status(201).json(createdDevice);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else {
      next(new ApiError(error, 'src/controllers/deviceController.js - createDevice', 500));
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
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else if (error instanceof NotFoundError) next(error);
    else {
      next(new ApiError(error, 'src/controllers/deviceController.js - updateDeviceById', 500));
    }
  }
};

export const deleteDeviceById = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    await deviceServices.deleteDeviceById(deviceId);
    res.status(204).json({
      message: `Device with id ${deviceId} deleted`,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else if (error instanceof NotFoundError) next(error);
    else {
      next(new ApiError(error, 'src/controllers/deviceController.js - deleteDeviceById', 500));
    }
  }
};

export const getDeviceById = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const device = await deviceServices.getDeviceById(deviceId);
    res.status(200).json(device);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationException') {
      next(new BadRequestError('Invalid Request', error));
    } else if (error instanceof NotFoundError) next(error);
    else {
      next(new ApiError(error, 'src/controllers/deviceController.js - getDeviceById', 500));
    }
  }
};
