import express from 'express';
import { eventContext } from 'aws-serverless-express/middleware.js';

import devicesRouter from './routers/devicesRouter.js';
import deviceRouter from './routers/deviceRouter.js';

const app = express()
app.use(express.json())
app.use(eventContext())
// app.use(cors())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use('/devices', devicesRouter);
app.use('/device', deviceRouter);

app.listen(3000, function() {
    console.log("App started 🔥")
});

export default app
