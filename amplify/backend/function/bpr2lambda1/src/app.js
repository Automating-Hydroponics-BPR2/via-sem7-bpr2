import express from 'express';
import cors from 'cors';
import { eventContext } from 'aws-serverless-express/middleware.js';

import devicesRouter from './routers/devicesRouter.js';
import deviceRouter from './routers/deviceRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(eventContext());

app.use('/devices', devicesRouter);
app.use('/device', deviceRouter);

app.listen(3000, function () {
  console.log('App started! 🔥');
});

export default app;
