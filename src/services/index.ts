import { register, login } from './user-service';
import {
  createDevice,
  getDeviceWithId,
  getDeviceIds,
  getHistoricalReadings,
  getCurrentReading,
  updateDeviceWithId,
  deleteDeviceWithId,
} from './device-service';

export const userService = {
  login,
  register,
};

export const deviceService = {
  createDevice,
  getDeviceWithId,
  getDeviceIds,
  getHistoricalReadings,
  getCurrentReading,
  updateDeviceWithId,
  deleteDeviceWithId,
};
