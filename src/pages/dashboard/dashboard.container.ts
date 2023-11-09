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
    setSelectedDeviceIdChart: (deviceId: string) => {
      dispatch(deviceService.getCurrentReading(deviceId));
      dispatch(setDashboardSelectedDeviceIdChart(deviceId));
    },
    setSelectedDeviceIdDataTable: (deviceId: string) => {
      dispatch(setDashboardSelectedDeviceIdDataTable(deviceId));
    },
    setSelectedDeviceIdInformaton: (deviceId: string) => {
      dispatch(deviceService.getDeviceWithId(deviceId));
      dispatch(setDashboardSelectedDeviceIdInformaton(deviceId));
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
    getDeviceIds: () => {
      dispatch(deviceService.getDeviceIds());
    },
    getDeviceWithId: (id: string) => {
      dispatch(deviceService.getDeviceWithId(id));
    },
    getCurrentReading: (id: string) => {
      dispatch(deviceService.getCurrentReading(id));
    },
    getHistoricalReadings: (id: string, start: string, end: string, type?: string) => {
      dispatch(deviceService.getHistoricalReadings(id, start, end, type));
    },
    createDevice: (deviceData: DeviceModel) => {
      dispatch(deviceService.createDevice(deviceData));
    },
    updateDeviceWithId: (id: string, deviceData: DeviceModel) => {
      dispatch(deviceService.updateDeviceWithId(id, deviceData));
    },
    deleteDeviceWithId: (id: string) => {
      dispatch(deviceService.deleteDeviceWithId(id));
    },

    // User
    deleteUserWithId: () => {
      dispatch(userService.deleteUserWithId());
    },
    updateUserWithId: (userData: User) => {
      dispatch(userService.updateUserWithId(userData));
    },
  };
};

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
