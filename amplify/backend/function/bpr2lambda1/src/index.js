import { createServer, proxy } from 'aws-serverless-express';
import app from './code/app.js';

const server = createServer(app);

export async function handler(event, context) {
  return await proxy(server, event, context, 'PROMISE').promise;
}
