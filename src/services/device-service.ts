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
import { NavigateFunction } from 'react-router-dom';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }
};

// Create a function to make a POST request to create a new device
export const createDevice = (navigate: NavigateFunction, deviceData: DeviceModel) => (dispatch: any) => {
  const token = getToken();
  if (token) {
    dispatch(setDashboardIsLoading(true));
    axios
      .post(deviceEndpoints.create(), JSON.stringify(deviceData), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
  } else {
    navigate('/login');
    dispatch(
      setSnackbar({
        open: true,
        type: 'warning',
        message: `Your session has expired! You need to login again!`,
      }),
    );
  }
};

export const getDeviceWithId = (navigate: NavigateFunction, deviceId: string) => (dispatch: any) => {
  const token = getToken();
  if (token) {
    dispatch(setDashboardIsLoading(true));
    axios
      .get(deviceEndpoints.get(deviceId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => {
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
  } else {
    navigate('/login');
    dispatch(
      setSnackbar({
        open: true,
        type: 'warning',
        message: `Your session has expired! You need to login again!`,
      }),
    );
  }
};

export const updateDeviceWithId =
  (navigate: NavigateFunction, id: string, deviceData: DeviceModel) => (dispatch: any) => {
    const token = getToken();
    if (token) {
      dispatch(setDashboardIsLoading(true));
      axios
        .patch(deviceEndpoints.update(id), JSON.stringify(deviceData), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          dispatch(setDevice(res.data as CreatedDeviceModel));
          dispatch(setDashboardSelectedDeviceIdInformaton(res.data.deviceId as string));
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
    } else {
      navigate('/login');
      dispatch(
        setSnackbar({
          open: true,
          type: 'warning',
          message: `Your session has expired! You need to login again!`,
        }),
      );
    }
  };

export const deleteDeviceWithId = (navigate: NavigateFunction, id: string) => (dispatch: any) => {
  const token = getToken();
  if (token) {
    dispatch(setDashboardIsLoading(true));
    axios
      .delete(deviceEndpoints.delete(id), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
  } else {
    navigate('/login');
    dispatch(
      setSnackbar({
        open: true,
        type: 'warning',
        message: `Your session has expired! You need to login again!`,
      }),
    );
  }
};

export const getCurrentReading = (navigate: NavigateFunction, id: string) => (dispatch: any) => {
  const token = getToken();
  if (token) {
    dispatch(setDashboardIsLoading(true));
    axios
      .get(deviceEndpoints.getCurrent(id), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        dispatch(setCurrentReading(res.data as DeviceReading));
        // I want here to check what is the highest value out of the current reading and set the threshold to that value + 10. Keep in mind that values are in string format and also I only need to check ph, light, temp, waterTemp and humidity values.
        const currentReading = res.data as DeviceReading;
        const isCurrentReadingEmpty = Object.keys(currentReading).length === 0 && currentReading.constructor === Object;
        if (currentReading && !isCurrentReadingEmpty) {
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
        }

        dispatch(
          setSnackbar({
            open: true,
            type: !isCurrentReadingEmpty ? 'success' : 'warning',
            message: !isCurrentReadingEmpty
              ? `Successfully retrieved current device data!`
              : `No current readings found!`,
          }),
        );
        dispatch(
          addANotification({
            id: uuidv4(),
            title: !isCurrentReadingEmpty ? 'Current device data retrieved' : 'No current readings found',
            description: !isCurrentReadingEmpty
              ? `You have successfully retrieved current device data for device with id ${id}!`
              : `You have no current readings for device with id ${id}!`,
            read: false,
            priority: !isCurrentReadingEmpty ? Priority.LOW : Priority.HIGH,
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
  } else {
    navigate('/login');
    dispatch(
      setSnackbar({
        open: true,
        type: 'warning',
        message: `Your session has expired! You need to login again!`,
      }),
    );
  }
};

export const getHistoricalReadings =
  (navigate: NavigateFunction, id: string, start: number, end: number) => (dispatch: any) => {
    const token = getToken();
    if (token) {
      dispatch(setDashboardIsLoading(true));
      axios
        .get(deviceEndpoints.getHistorical(id, start, end), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: any) => {
          dispatch(setHistoricalReadings(res.data.devices as DeviceReading[]));
          dispatch(
            setSnackbar({
              open: true,
              type: res.data.devices.length === 0 ? 'warning' : 'success',
              message:
                res.data.devices.length === 0
                  ? `No historical readings found for selected device!`
                  : `Successfully retrieved historical device data!`,
            }),
          );
          dispatch(
            addANotification({
              id: uuidv4(),
              title:
                res.data.devices.length === 0 ? 'No historical readings found' : 'Historical device data retrieved',
              description:
                res.data.devices.length === 0
                  ? `You have no historical readings for device with id ${id}!`
                  : `You have successfully retrieved historical device data for device with id ${id}!`,
              read: false,
              priority: res.data.devices.length === 0 ? Priority.HIGH : Priority.LOW,
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
    } else {
      navigate('/login');
      dispatch(
        setSnackbar({
          open: true,
          type: 'warning',
          message: `Your session has expired! You need to login again!`,
        }),
      );
    }
  };

export const getDeviceIds = (navigate: NavigateFunction) => (dispatch: any) => {
  const token = getToken();
  if (token) {
    dispatch(setDashboardIsLoading(true));
    axios
      .get(deviceEndpoints.getDeviceIds(), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => {
        dispatch(setDeviceIds(res.data.ids as string[]));
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
  } else {
    navigate('/login');
    dispatch(
      setSnackbar({
        open: true,
        type: 'warning',
        message: `Your session has expired! You need to login again!`,
      }),
    );
  }
};

// Create functions for other device-related operations (get, update, delete, etc.) using similar patterns.
