import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userServices } from '../services/userService.js';
import dotenv from 'dotenv';
import { ApiError, UnauthorizedError } from '../helpers/apiError.js';
dotenv.config({ path: '.env' });
export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.SECRETS_JWT,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    try {
      const user = await userServices.checkIfUserWithIdExists(payload.id, true);
      if (user) {
        done(null, user);
      } else {
        done(new UnauthorizedError('User not found', 'src/config/passport.js - jwtStrategy'), false);
      }
    } catch (error) {
      if (error instanceof ApiError) done(error, false);
      else {
        done(new UnauthorizedError(error, 'src/config/passport.js - jwtStrategy'), false);
      }
    }
  },
);

/*
! Added this 2 lines because who know why env variables are not loaded
! even though I am calling exactly the same 2 lines in app.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
*/
