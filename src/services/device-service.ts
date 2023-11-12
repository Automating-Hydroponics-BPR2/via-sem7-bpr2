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
  CreatedDeviceModel,
  setDashboardSelectedDeviceIdInformaton,
  addADeviceId,
  setDashboardThreshold,
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
      dispatch(setDevice(res.data as CreatedDeviceModel));
      dispatch(setDashboardSelectedDeviceIdInformaton(deviceData.deviceId));
      dispatch(addADeviceId(deviceData.deviceId));
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'You have created a device',
          description: `You have successfully created a new device with id ${deviceData.deviceId}!`,
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
          description: `You have failed to create a new device with id ${deviceData.deviceId}!`,
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

export const getDeviceWithId = (deviceId: string) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .get(deviceEndpoints.get(deviceId), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(setDevice(res.data as CreatedDeviceModel));
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
          description: `You have successfully retrieved a device with id ${deviceId}!`,
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
          description: `You have failed to retrieve a device with id ${deviceId}!`,
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
      dispatch(setDevice(res.data as CreatedDeviceModel));
      dispatch(setDashboardSelectedDeviceIdInformaton(res.data.deviceId as string));
      dispatch(addADeviceId(res.data.deviceId as string));
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
          description: `You have failed to update a device with deviceId ${deviceData.deviceId}. Keep in mind that this request can fail if you are trying to add a device with an existing deviceId. Check your current device ids in the dashboard under selected device id dropdown to see if you have already used a deviceId you tried!`,
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
      dispatch(setDevice(undefined));
      dispatch(setDashboardSelectedDeviceIdInformaton(undefined));
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
      // I want here to check what is the highest value out of the current reading and set the threshold to that value + 10. Keep in mind that values are in string format and also I only need to check ph, light, temp, waterTemp and humidity values.
      const currentReading = res.data as DeviceReading;
      const currentReadingValues = [
        currentReading.ph,
        currentReading.light,
        currentReading.temp,
        currentReading.waterTemp,
        currentReading.humidity,
      ];
      const currentReadingValuesAsNumbers = currentReadingValues.map((value) => parseInt(value));
      const highestValue = Math.max(...currentReadingValuesAsNumbers);
      dispatch(setDashboardThreshold(highestValue + 10));

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
          description: `You have successfully retrieved current device data for device with deviceId ${id}!`,
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

export const getHistoricalReadings = (id: string, start: number, end: number) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .get(deviceEndpoints.getHistorical(id, start, end), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res: any) => {
      console.log(res.data.devices);
      dispatch(setHistoricalReadings(res.data.devices as DeviceReading[]));
      // TODO Future improvement can be to check if res.data.lastEvaluatedKey exists and if it does, then we can make another call to get the next set of data and etc.
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
