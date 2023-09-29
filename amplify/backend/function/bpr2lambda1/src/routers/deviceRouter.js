import express from 'express';
import { getAllDevices, createDevice, getDeviceById } from '../controllers/deviceController.js';

const deviceRouter = express.Router({
  mergeParams: true,
});

deviceRouter.get('/', getAllDevices);

deviceRouter.post('/', createDevice);

deviceRouter.get('/:deviceId', getDeviceById);

export default deviceRouter;
