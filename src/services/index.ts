import { register, login, updateUserWithId, deleteUserWithId } from './user-service';
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
  updateUserWithId,
  deleteUserWithId,
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
