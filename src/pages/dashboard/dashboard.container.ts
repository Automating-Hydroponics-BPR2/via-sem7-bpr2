import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  type ApplicationState,
  type AppDispatch,
  setDashboardThreshold,
  setDashboardSelectedDeviceIdChart,
  setDashboardType,
  setDashboardSelectedDeviceIdDataTable,
  setDashboardSelectedDeviceIdInformaton,
  DeviceModel,
  User,
  addANotification,
  Priority,
  setDashboardDateFilterLabel,
  setDashboardDateFilter,
  DateFilter,
} from '../../shared';
import { Dashboard } from './dashboard';
import { deviceService, userService } from '../../services';
import { NavigateFunction } from 'react-router-dom';

const mapStateToProps = (state: ApplicationState) => ({
  type: state.dashboard.type,
  user: state.user.user,
  device: state.device.device,
  deviceIds: state.device.deviceIds,
  threshold: state.dashboard.threshold,
  isLoading: state.dashboard.isLoading,
  dateFilter: state.dashboard.dateFilter,
  currentReading: state.device.currentReading,
  dateFilterLabel: state.dashboard.dateFilterLabel,
  historicalReadings: state.device.historicalReadings,
  selectedDeviceIdChart: state.dashboard.selectedDeviceIdChart,
  selectedDeviceIdDataTable: state.dashboard.selectedDeviceIdDataTable,
  selectedDeviceIdInformaton: state.dashboard.selectedDeviceIdInformaton,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setThreshold: (threshold: number) => {
      dispatch(setDashboardThreshold(threshold));
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Threshold changed',
          description: `You have successfully changed the threshold to ${threshold}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
    },
    setSelectedDeviceIdChart: (navigate: NavigateFunction, deviceId: string) => {
      dispatch(setDashboardSelectedDeviceIdChart(deviceId));
      dispatch(deviceService.getCurrentReading(navigate, deviceId));
    },
    setSelectedDeviceIdDataTable: (navigate: NavigateFunction, deviceId: string, dateFilter?: DateFilter) => {
      if (dateFilter) {
        const start = dateFilter.start;
        const end = dateFilter.end;
        dispatch(setDashboardSelectedDeviceIdDataTable(deviceId));
        dispatch(deviceService.getHistoricalReadings(navigate, deviceId, start, end));
      }
    },
    setSelectedDeviceIdInformaton: (navigate: NavigateFunction, deviceId: string) => {
      dispatch(setDashboardSelectedDeviceIdInformaton(deviceId));
      dispatch(deviceService.getDeviceWithId(navigate, deviceId));
    },
    setType: (type: string) => {
      dispatch(setDashboardType(type));
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Type changed',
          description: `You have successfully changed the type to ${type}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
    },
    setDateFilterLabel: (dateFilterLabel: string) => {
      dispatch(setDashboardDateFilterLabel(dateFilterLabel));
    },
    setDateFilter: (dateFilter: DateFilter) => {
      dispatch(setDashboardDateFilter(dateFilter));
    },

    // Device
    getDeviceIds: (navigate: NavigateFunction) => {
      dispatch(deviceService.getDeviceIds(navigate));
    },
    createDevice: (navigate: NavigateFunction, deviceData: DeviceModel) => {
      dispatch(deviceService.createDevice(navigate, deviceData));
    },
    updateDeviceWithId: (navigate: NavigateFunction, id: string, deviceData: DeviceModel) => {
      dispatch(deviceService.updateDeviceWithId(navigate, id, deviceData));
      dispatch(deviceService.getDeviceIds(navigate));
    },
    deleteDeviceWithId: (navigate: NavigateFunction, id: string) => {
      dispatch(deviceService.deleteDeviceWithId(navigate, id));
      dispatch(deviceService.getDeviceIds(navigate));
    },

    // User
    deleteUserWithId: (navigate: NavigateFunction) => {
      dispatch(userService.deleteUserWithId(navigate));
    },
    updateUserWithId: (navigate: NavigateFunction, userData: Partial<User>) => {
      dispatch(userService.updateUserWithId(navigate, userData));
    },
  };
};

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
