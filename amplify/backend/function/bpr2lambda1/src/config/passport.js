import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userServices from '../services/userService.js';

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.SECRETS_JWT,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    try {
      console.log('payload', payload);
      const user = await userServices.checkIfUsernameExists(payload.username, true);
      done(null, user);
    } catch (error) {
      done(error);
    }
  },
);
