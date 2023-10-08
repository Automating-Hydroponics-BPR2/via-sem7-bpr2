import { Router } from 'express';
import passport from 'passport';
import {
  createDevice,
  deleteDeviceById,
  updateDeviceById,
  getCurrentReadings,
  getHistoricalReadings,
} from '../controllers/deviceController.js';

const deviceRouter = Router();

deviceRouter.get('/current', passport.authenticate('jwt', { session: false }), getCurrentReadings);
deviceRouter.get('/historical', passport.authenticate('jwt', { session: false }), getHistoricalReadings);
deviceRouter.post('/new', passport.authenticate('jwt', { session: false }), createDevice);
deviceRouter.patch('/', passport.authenticate('jwt', { session: false }), updateDeviceById);
deviceRouter.delete('/', passport.authenticate('jwt', { session: false }), deleteDeviceById);

export default deviceRouter;
