import { handler } from './index.js';

// get contents from file named event.json
const event = require('./event.json');

const main = async () => {
  const response = await handler(event, null);
  console.log(response);
};

main();
