import { connect } from 'react-redux';

import {
  type ApplicationState,
  type AppDispatch,
  DeviceModel,
  setDashboardDevice,
  setDashboardReadingsList,
  setDashboardThreshold,
  setDashboardIsLoading,
  setDashboardUser,
  setDashboardDeviceIds,
  setDashboardSelectedDeviceIdChart,
  AuthenticatedUser,
  resetDashboard,
  setDashboardType,
  setDashboardSelectedDeviceIdDataTable,
  setDashboardSelectedDeviceIdInformaton,
} from '../../shared';
import { Dashboard } from './dashboard';
import { DeviceReading } from '../../shared/models/device';

const mapStateToProps = (state: ApplicationState) => ({
  type: state.dashboard.type,
  user: state.dashboard.user,
  device: state.dashboard.device,
  deviceIds: state.dashboard.deviceIds,
  isLoading: state.dashboard.isLoading,
  threshold: state.dashboard.threshold,
  readingsList: state.dashboard.readingsList,
  selectedDeviceIdChart: state.dashboard.selectedDeviceIdChart,
  selectedDeviceIdDataTable: state.dashboard.selectedDeviceIdDataTable,
  selectedDeviceIdInformaton: state.dashboard.selectedDeviceIdInformaton,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setDevice: (device: DeviceModel) => {
      dispatch(setDashboardDevice(device));
    },
    setUser: (user: AuthenticatedUser) => {
      dispatch(setDashboardUser(user));
    },
    setReadingsList: (readingsList: DeviceReading[]) => {
      dispatch(setDashboardReadingsList(readingsList));
    },
    setThreshold: (threshold: number) => {
      dispatch(setDashboardThreshold(threshold));
    },
    setIsLoading: (isLoading: boolean) => {
      dispatch(setDashboardIsLoading(isLoading));
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
    setDeviceIds: (deviceIds: string[]) => {
      dispatch(setDashboardDeviceIds(deviceIds));
    },
    setType: (type: string) => {
      dispatch(setDashboardType(type));
    },
    reset() {
      dispatch(resetDashboard());
    },
  };
};

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
