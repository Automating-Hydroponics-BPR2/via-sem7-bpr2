// mqttController.js
import mqttClient from '../services/mqttService.js';

export const subscribeToUserTopic = (username) => {
  mqttClient.subscribe(`user/${username}`);
  console.log(`Subscribed to topic: user/${username}`);
};

// Export other MQTT-related functions as needed
// For example, you might have a function to publish a message
export const publishMessage = (topic, message) => {
  mqttClient.publish(topic, message);
  console.log(`Published message to topic: ${topic}`);
};
