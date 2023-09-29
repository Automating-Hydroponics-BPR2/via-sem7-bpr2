import { deviceServices } from '../services/deviceService.js';

export const getAllDevices = async (req, res, next) => {
  try {
    const devices = await deviceServices.getAllDevices();
    res.status(200).json(devices);
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDevice = async (req, res, next) => {
  try {
    const { body: device } = req;
    const createdDevice = await deviceServices.createDevice(device);
    res.status(201).json(createdDevice);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDeviceById = async (req, res, next) => {
  try {
    console.log('getDeviceById');
    const { deviceId } = req.params;
    const device = await deviceServices.findById(deviceId);
    res.status(200).json(device);
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
