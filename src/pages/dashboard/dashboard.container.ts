import { connect } from 'react-redux';

import {
  type ApplicationState,
  type AppDispatch,
  setDashboardThreshold,
  setDashboardSelectedDeviceIdChart,
  resetDashboardStore,
  setDashboardType,
  setDashboardSelectedDeviceIdDataTable,
  setDashboardSelectedDeviceIdInformaton,
  DeviceModel,
  setDashboardIsLoading,
  User,
} from '../../shared';
import { Dashboard } from './dashboard';
import { deviceService, userService } from '../../services';

const mapStateToProps = (state: ApplicationState) => ({
  type: state.dashboard.type,
  user: state.user.user,
  device: state.device.device,
  deviceIds: state.device.deviceIds,
  isLoading: state.dashboard.isLoading,
  threshold: state.dashboard.threshold,
  currentReading: state.device.currentReading,
  historicalReadings: state.device.historicalReadings,
  selectedDeviceIdChart: state.dashboard.selectedDeviceIdChart,
  selectedDeviceIdDataTable: state.dashboard.selectedDeviceIdDataTable,
  selectedDeviceIdInformaton: state.dashboard.selectedDeviceIdInformaton,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setThreshold: (threshold: number) => {
      dispatch(setDashboardThreshold(threshold));
    },
    setSelectedDeviceIdChart: (deviceId: string) => {
      dispatch(setDashboardSelectedDeviceIdChart(deviceId));
    },
    setSelectedDeviceIdDataTable: (deviceId: string) => {
      dispatch(setDashboardSelectedDeviceIdDataTable(deviceId));
    },
    setSelectedDeviceIdInformaton: (deviceId: string) => {
      dispatch(setDashboardSelectedDeviceIdInformaton(deviceId));
    },
    setType: (type: string) => {
      dispatch(setDashboardType(type));
    },
    reset() {
      dispatch(resetDashboardStore());
    },

    // Services
    onInit: () => {
      dispatch(setDashboardIsLoading(true));
      dispatch(deviceService.getDeviceIds());
      dispatch(setDashboardIsLoading(false));
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
