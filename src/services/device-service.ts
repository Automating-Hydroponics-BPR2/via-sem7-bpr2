// device-service.ts
import axios from 'axios';
import {
  DeviceModel,
  deviceEndpoints,
  setDashboardDevice,
  setNotification,
  setDashboardCurrentReading,
  DeviceReading,
  setDashboardHistoricalReadings,
  setDashboardDeviceIds,
} from '../shared';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
};

// Create a function to make a POST request to create a new device
export const createDevice = (deviceData: any) => (dispatch: any) => {
  axios
    .post(deviceEndpoints.create(), JSON.stringify(deviceData), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Device was created successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Device was not created!`,
        }),
      );
      console.error(err);
    });
};

export const getDeviceWithId = (id: string) => (dispatch: any) => {
  axios
    .get(deviceEndpoints.get(id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setDashboardDevice(res.data as DeviceModel));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Device was retrieved successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Device was not retrieved!`,
        }),
      );
      console.error(err);
    });
};

export const updateDeviceWithId = (id: string, deviceData: any) => (dispatch: any) => {
  axios
    .put(deviceEndpoints.update(id), JSON.stringify(deviceData), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setDashboardDevice(res.data as DeviceModel));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Device was updated successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Device was not updated!`,
        }),
      );
      console.error(err);
    });
};

export const deleteDeviceWithId = (id: string) => (dispatch: any) => {
  axios
    .delete(deviceEndpoints.delete(id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.status);
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Device was deleted successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Device was not deleted!`,
        }),
      );
      console.error(err);
    });
};

export const getCurrentReading = (id: string) => (dispatch: any) => {
  axios
    .get(deviceEndpoints.getCurrent(id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setDashboardCurrentReading(res.data as DeviceReading));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Successfully retrieved current device data!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Failed to retrieve current device data!`,
        }),
      );
      console.error(err);
    });
};

export const getHistoricalReadings = (id: string, start: string, end: string, type?: string) => (dispatch: any) => {
  axios
    .get(deviceEndpoints.getHistorical(id, start, end, type), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setDashboardHistoricalReadings(res.data as DeviceReading[]));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Successfully retrieved historical device data!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Failed to retrieve historical device data!`,
        }),
      );
      console.error(err);
    });
};

export const getDeviceIds = () => (dispatch: any) => {
  axios
    .get(deviceEndpoints.getDeviceIds(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setDashboardDeviceIds(res.data as string[]));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `Successfully retrieved device ids!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `Failed to retrieve device ids!`,
        }),
      );
      console.error(err);
    });
};

// Create functions for other device-related operations (get, update, delete, etc.) using similar patterns.
