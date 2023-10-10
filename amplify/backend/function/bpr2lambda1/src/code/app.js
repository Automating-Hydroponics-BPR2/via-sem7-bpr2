import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { eventContext } from 'aws-serverless-express/middleware.js';
import passport from 'passport';

import { jwtStrategy } from './config/passport.js';

import userRouter from './routers/userRouter.js';
import deviceRouter from './routers/deviceRouter.js';

import apiErrorHandler from './middlewares/apiErrorHandler.js';

dotenv.config({ path: '.env' });
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://stg-amplifychanges-4-10-23.d2w95gfx7rgwd6.amplifyapp.com',
      'https://main.d2w95gfx7rgwd6.amplifyapp.com',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());
app.use(eventContext());
passport.use(jwtStrategy);

app.use('/user', userRouter);
app.use('/device', deviceRouter);

// Custom API error handler
app.use(apiErrorHandler);

app.listen(3000, function () {
  console.log('App started! 🔥');
});

export default app;
