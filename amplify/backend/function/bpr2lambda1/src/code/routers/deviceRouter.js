import { Router } from 'express';
import passport from 'passport';
import {
  createDevice,
  deleteDeviceById,
  updateDeviceById,
  getCurrentReadings,
  getHistoricalReadings,
  getDeviceIdsForUser,
  getDeviceInformationForId,
} from '../controllers/deviceController.js';

const deviceRouter = Router();

deviceRouter.get('/all', passport.authenticate('jwt', { session: false }), getDeviceIdsForUser);
deviceRouter.get('/current', passport.authenticate('jwt', { session: false }), getCurrentReadings);
deviceRouter.get('/historical', passport.authenticate('jwt', { session: false }), getHistoricalReadings);
deviceRouter.post('/new', passport.authenticate('jwt', { session: false }), createDevice);
deviceRouter.get('/', passport.authenticate('jwt', { session: false }), getDeviceInformationForId);
deviceRouter.delete('/', passport.authenticate('jwt', { session: false }), deleteDeviceById);
deviceRouter.patch('/', passport.authenticate('jwt', { session: false }), updateDeviceById);

export default deviceRouter;
