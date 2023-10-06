import { deviceServices } from '../services/deviceService.js';
import { InternalServerError, ApiError } from '../helpers/apiError.js';

export const createDevice = async (req, res, next) => {
  try {
    const {
      body: device,
      user: { id: userId },
    } = req;
    const createdDevice = await deviceServices.createDevice(device, userId);
    res.status(201).json(createdDevice);
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/deviceController.js - createDevice'));
    }
  }
};

export const updateDeviceById = async (req, res, next) => {
  try {
    const {
      body: device,
      query: deviceId,
      user: { id: userId },
    } = req;
    const updatedDevice = await deviceServices.updateDeviceById(deviceId, userId, device);
    res.status(200).json(updatedDevice);
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/deviceController.js - updateDeviceById'));
    }
  }
};

export const deleteDeviceById = async (req, res, next) => {
  try {
    const {
      query: deviceId,
      user: { id: userId },
    } = req;
    await deviceServices.deleteDeviceById(deviceId, userId);
    res.status(204).end();
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/deviceController.js - deleteDeviceById'));
    }
  }
};

export const getCurrentReadings = async (req, res, next) => {
  try {
    const {
      query: deviceId,
      user: { id: userId },
    } = req;
    const currentReadings = await deviceServices.getCurrentReadings(deviceId, userId);
    res.status(200).json(currentReadings);
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/deviceController.js - getCurrentReadings'));
    }
  }
};

export const getHistoricalReadings = async (req, res, next) => {
  try {
    const {
      query: { deviceId, type, start, end },
      user: { id: userId },
    } = req;
    const historicalReadings = await deviceServices.getHistoricalReadings(deviceId, userId, start, end, type);
    res.status(200).json(historicalReadings);
  } catch (error) {
    if (error instanceof ApiError) next(error);
    else {
      next(new InternalServerError(error, 'src/controllers/deviceController.js - getHistoricalReadings'));
    }
  }
};
