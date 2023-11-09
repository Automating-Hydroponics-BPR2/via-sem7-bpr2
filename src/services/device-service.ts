// device-service.ts
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  DeviceModel,
  deviceEndpoints,
  setSnackbar,
  DeviceReading,
  setCurrentReading,
  setDevice,
  setDeviceIds,
  setHistoricalReadings,
  setDashboardIsLoading,
  addANotification,
  Priority,
} from '../shared';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  return token;
};

// Create a function to make a POST request to create a new device
export const createDevice = (deviceData: DeviceModel) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .post(deviceEndpoints.create(), JSON.stringify(deviceData), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'You have created a device',
          description: `You have successfully created a new device with id ${deviceData.id}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Device was created successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `Device was not created!`,
        }),
      );
      console.error(err);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Device creation failed',
          description: `You have failed to create a new device with id ${deviceData.id}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

export const getDeviceWithId = (id: string) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .get(deviceEndpoints.get(id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setDevice(res.data as DeviceModel));
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Device was retrieved successfully!`,
        }),
      );
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Device retrieved',
          description: `You have successfully retrieved a device with id ${id}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `Device was not retrieved!`,
        }),
      );
      console.error(err);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Device retrieval failed',
          description: `You have failed to retrieve a device with id ${id}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

export const updateDeviceWithId = (id: string, deviceData: DeviceModel) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .patch(deviceEndpoints.update(id), JSON.stringify(deviceData), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'You have updated a device',
          description: `You have successfully updated a device with id ${id}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Device was updated successfully!`,
        }),
      );
      dispatch(setDevice(res.data as DeviceModel));
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `Device was not updated!`,
        }),
      );
      console.error(err);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Device update failed',
          description: `You have failed to update a device with id ${id}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

export const deleteDeviceWithId = (id: string) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
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
        addANotification({
          id: uuidv4(),
          title: 'You have deleted a device',
          description: `You have successfully deleted a device with id ${id}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Device was deleted successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `Device was not deleted!`,
        }),
      );
      console.error(err);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Device deletion failed',
          description: `You have failed to delete a device with id ${id}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

export const getCurrentReading = (id: string) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .get(deviceEndpoints.getCurrent(id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setCurrentReading(res.data as DeviceReading));
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Successfully retrieved current device data!`,
        }),
      );
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Current device data retrieved',
          description: `You have successfully retrieved current device data for device with id ${id}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `Failed to retrieve current device data!`,
        }),
      );
      console.error(err);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Current device data retrieval failed',
          description: `You have failed to retrieve current device data for device with id ${id}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

export const getHistoricalReadings = (id: string, start: string, end: string, type?: string) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .get(deviceEndpoints.getHistorical(id, start, end, type), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setHistoricalReadings(res.data as DeviceReading[]));
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Successfully retrieved historical device data!`,
        }),
      );
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Historical device data retrieved',
          description: `You have successfully retrieved historical device data for device with id ${id}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `Failed to retrieve historical device data!`,
        }),
      );
      console.error(err);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Historical device data retrieval failed',
          description: `You have failed to retrieve historical device data for device with id ${id}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

export const getDeviceIds = () => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .get(deviceEndpoints.getDeviceIds(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data.ids);
      dispatch(setDeviceIds(res.data.ids as string[]));
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Successfully retrieved device ids!`,
        }),
      );
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Device ids retrieved',
          description: `You have successfully retrieved device ids!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `Failed to retrieve device ids!`,
        }),
      );
      console.error(err);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Device ids retrieval failed',
          description: `You have failed to retrieve device ids!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

// Create functions for other device-related operations (get, update, delete, etc.) using similar patterns.
