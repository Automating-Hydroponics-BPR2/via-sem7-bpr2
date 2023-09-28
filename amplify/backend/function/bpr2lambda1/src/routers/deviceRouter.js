import express from 'express';
import { getAllDevices, createDevice, findById } from '../controllers/deviceController.js';

const deviceRouter = express.Router({
  mergeParams: true,
});

deviceRouter.get('/', getAllDevices);

deviceRouter.post('/', createDevice);

deviceRouter.get('/:deviceId', findById);

export default deviceRouter