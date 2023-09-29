import express from 'express';
import { getAllDevices } from '../controllers/deviceController.js';

const devicesRouter = express.Router({
  mergeParams: true,
});

devicesRouter.get('/', getAllDevices);

export default devicesRouter;
