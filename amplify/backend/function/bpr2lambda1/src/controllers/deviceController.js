// deviceController.js
import { deviceServices } from '../services/deviceService.js';

export const getAllDevices = async (req, res, next) => {
  const devices = await deviceServices.getAllDevices();
  res.status(200).json(devices).end();
};

export const createDevice = async (req, res, next) => {
  const device = JSON.parse(req.body);
  const createdDevice = await deviceServices.createDevice(device);
  res.status(201).json(createdDevice).end();
};

export const findById = async (req, res, next) => {
  const { deviceId } = req.pathParameters;
  const device = await deviceServices.findById(deviceId);
  res.status(200).json(device).end();
};
