import { Router } from 'express';
import { createDevice, getDeviceById, deleteDeviceById, updateDeviceById } from '../controllers/deviceController.js';

const deviceRouter = Router();

deviceRouter.get('/:deviceId', getDeviceById);
deviceRouter.post('/', createDevice);
deviceRouter.patch('/:deviceId', updateDeviceById);
deviceRouter.delete('/:deviceId', deleteDeviceById);

export default deviceRouter;
