import { handler } from './index.js';

const event = {
    httpMethod: 'GET',
    path: '/devices/{deviceId}',
    headers: {
        'Content-Type': 'application/json',
    },
    body: null,
    pathParameters: {
        deviceId: '1234',
    }
}

const main = async () => {
  const response = await handler(event);
  console.log(response);
};

main();
