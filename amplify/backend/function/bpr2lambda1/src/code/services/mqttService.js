// mqttService.js
import { connect } from 'mqtt';

const mqttClient = connect(process.env.MQTT_BROKER_URL);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

mqttClient.on('error', (error) => {
  console.error('MQTT error:', error);
});

export default mqttClient;
