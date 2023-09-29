import express from 'express';
import { createDevice, getDeviceById } from '../controllers/deviceController.js';

const deviceRouter = express.Router({
  mergeParams: true,
});

deviceRouter.post('/', createDevice);

deviceRouter.get('/:deviceId', getDeviceById);

export default deviceRouter;
