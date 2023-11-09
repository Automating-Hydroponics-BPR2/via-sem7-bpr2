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
deviceRouter.get('/:id', passport.authenticate('jwt', { session: false }), getDeviceInformationForId);
deviceRouter.post('/new', passport.authenticate('jwt', { session: false }), createDevice);
deviceRouter.delete('/:id', passport.authenticate('jwt', { session: false }), deleteDeviceById);
deviceRouter.patch('/:id', passport.authenticate('jwt', { session: false }), updateDeviceById);

export default deviceRouter;
