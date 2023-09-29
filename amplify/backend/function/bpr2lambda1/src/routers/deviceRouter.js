import { Router } from 'express';
import { createDevice, getDeviceById } from '../controllers/deviceController.js';

const deviceRouter = Router();

deviceRouter.get('/:deviceId', getDeviceById);
deviceRouter.post('/', createDevice);

export default deviceRouter;
