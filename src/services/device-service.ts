// device-service.ts
import axios from 'axios';
import { deviceEndpoints } from '../shared';

// Create a function to make a POST request to create a new device
export const createDevice = async (deviceData: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  return await axios.post(deviceEndpoints.create(), JSON.stringify(deviceData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create functions for other device-related operations (get, update, delete, etc.) using similar patterns.
