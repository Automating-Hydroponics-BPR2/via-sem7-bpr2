import mqtt from 'mqtt';
import { readingService } from './readingService.js';
import { InternalServerError } from '../helpers/apiError';

const connectMqtt = (options, deviceId) => {
  try {
    const readings = { temperature: [], humidity: [], waterTemp: [], ph: [], light: [] };
    const client = mqtt.connect(options);
    client.on('connect', () => {
      console.log('Connected to MQTT Broker');
    });

    client.on('error', (error) => {
      throw new InternalServerError(error, 'src/services/mqttService.js - connectMqtt 1');
    });

    client.subscribe(`home/temperature/${deviceId}`, (error) => {
      if (error) {
        console.log('Subscribe to home/temperature/1 failed');
        return;
      } else {
        console.log('Subscribed to topic: home/temperature/1');
      }
    });

    client.subscribe(`home/humidity/${deviceId}`, (error) => {
      if (error) {
        console.log('Subscribe to home/humidity/1 failed');
        return;
      } else {
        console.log('Subscribed to topic: home/humidity/1');
      }
    });

    client.subscribe(`home/waterTemp/${deviceId}`, (error) => {
      if (error) {
        console.log('Subscribe to home/waterTemp/1 failed');
        return;
      } else {
        console.log('Subscribed to topic: home/waterTemp/1');
      }
    });

    client.subscribe(`home/ph/${deviceId}`, (error) => {
      if (error) {
        console.log('Subscribe to home/ph/1 failed');
        return;
      } else {
        console.log('Subscribed to topic: home/ph/1');
      }
    });

    client.subscribe(`home/light/${deviceId}`, (error) => {
      if (error) {
        console.log('Subscribe to home/light/1 failed');
        return;
      } else {
        console.log('Subscribed to topic: home/light/1');
      }
    });

    client.on('message', async (topic, message) => {
      await handleReceivedMessage(topic, message, readings, deviceId);
    });
  } catch (error) {
    throw new InternalServerError(error, 'src/services/mqttService.js - connectMqtt 2');
  }
};

const handleReceivedMessage = async (topic, message, readings, deviceId) => {
  try {
    switch (topic) {
      case `home/temperature/${deviceId}`:
        readings.temperature.unshift(message.toString());
        break;
      case `home/humidity/${deviceId}`:
        readings.humidity.unshift(message.toString());
        break;
      case `home/waterTemp/${deviceId}`:
        readings.waterTemp.unshift(message.toString());
        break;
      case `home/ph/${deviceId}`:
        readings.ph.unshift(message.toString());
        break;
      case `home/light/${deviceId}`:
        readings.light.unshift(message.toString());
        break;
      default:
        break;
    }

    console.log(readings);

    const hasAllValues = Object.values(readings).every((array) => array.length > 0);

    if (hasAllValues) {
      let reading = {
        temperature: readings.temperature.pop(),
        humidity: readings.humidity.pop(),
        waterTemp: readings.waterTemp.pop(),
        ph: readings.ph.pop(),
        light: readings.light.pop(),
      };

      console.log(reading);
      await readingService.createReading(reading, deviceId);
    }
  } catch (error) {
    throw new InternalServerError(error, 'src/services/mqttService.js - handleReceivedMessage');
  }
};

export const mqttService = {
  connectMqtt,
  handleReceivedMessage,
};
