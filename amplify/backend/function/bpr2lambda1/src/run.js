import { handler } from './index.js';
import event from '../event.json' assert { type: "json" };

// get contents from file named event.json

const main = async () => {
  const response = await handler(event, null);
  console.log(response);
};

main();
