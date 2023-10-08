import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userServices } from '../services/userService.js';
import { ApiError, UnauthorizedError } from '../helpers/apiError.js';
export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.SECRETS_JWT,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    try {
      const user = await userServices.checkIfUsernameExists(payload.username, true, true);
      done(null, user);
    } catch (error) {
      if (error instanceof ApiError) done(error, false);
      else {
        done(new UnauthorizedError(error, 'src/config/passport.js - jwtStrategy'), false);
      }
    }
  },
);

/*
! Add this 2 lines because who know why env variables are not loaded
! even though I am calling exactly the same 2 lines in app.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
*/
