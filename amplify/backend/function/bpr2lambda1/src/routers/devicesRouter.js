import { Router } from 'express';
import { getAllDevices } from '../controllers/deviceController.js';

const devicesRouter = Router();

devicesRouter.get('/', getAllDevices);

export default devicesRouter;
