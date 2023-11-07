// device-service.ts
import axios from 'axios';
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
      dispatch(setDevice(res.data as DeviceModel));
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
      console.log(res.data);
      dispatch(setDeviceIds(res.data as string[]));
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `Successfully retrieved device ids!`,
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
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

// Create functions for other device-related operations (get, update, delete, etc.) using similar patterns.
