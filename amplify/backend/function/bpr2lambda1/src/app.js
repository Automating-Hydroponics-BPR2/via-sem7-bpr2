import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { eventContext } from 'aws-serverless-express/middleware.js';
import apiErrorHandler from './middlewares/apiErrorHandler.js';

import devicesRouter from './routers/devicesRouter.js';
import deviceRouter from './routers/deviceRouter.js';

dotenv.config({ path: '.env' });
const app = express();

app.use(cors());
app.use(express.json());
app.use(eventContext());

app.use('/devices', devicesRouter);
app.use('/device', deviceRouter);

// Custom API error handler
app.use(apiErrorHandler)

app.listen(3000, function () {
  console.log('App started! 🔥');
});

export default app;
