import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DeviceModel, DeviceReading } from '../models/device';
import { AuthenticatedUser } from '../models';

export interface DashboardStore {
  isLoading: boolean;
  threshold: number;
  type: string;
  deviceIds?: string[];
  device?: DeviceModel;
  user?: AuthenticatedUser;
  selectedDeviceIdChart?: string;
  selectedDeviceIdDataTable?: string;
  selectedDeviceIdInformaton?: string;
  readingsList?: DeviceReading[];
}

const initialState: DashboardStore = {
  type: 'Choose a type',
  isLoading: false,
  threshold: 60,
  user: undefined,
  device: undefined,
  deviceIds: undefined,
  readingsList: undefined,
  selectedDeviceIdChart: undefined,
  selectedDeviceIdDataTable: undefined,
  selectedDeviceIdInformaton: undefined,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardDevice(state, action: PayloadAction<DeviceModel>) {
      state.device = action.payload;
    },
    setDashboardReadingsList(state, action: PayloadAction<DeviceReading[]>) {
      state.readingsList = action.payload;
    },
    setDashboardUser(state, action: PayloadAction<AuthenticatedUser>) {
      state.user = action.payload;
    },
    setDashboardIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setDashboardDeviceIds(state, action: PayloadAction<string[]>) {
      state.deviceIds = action.payload;
    },
    setDashboardThreshold(state, action: PayloadAction<number>) {
      state.threshold = action.payload;
    },
    setDashboardSelectedDeviceIdChart(state, action: PayloadAction<string>) {
      state.selectedDeviceIdChart = action.payload;
    },
    setDashboardSelectedDeviceIdDataTable(state, action: PayloadAction<string>) {
      state.selectedDeviceIdDataTable = action.payload;
    },
    setDashboardSelectedDeviceIdInformaton(state, action: PayloadAction<string>) {
      state.selectedDeviceIdInformaton = action.payload;
    },
    setDashboardType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    resetDashboard(state) {
      state = initialState;
    },
  },
});

export default dashboardSlice.reducer;
export const {
  setDashboardDevice,
  resetDashboard,
  setDashboardReadingsList,
  setDashboardDeviceIds,
  setDashboardIsLoading,
  setDashboardThreshold,
  setDashboardType,
  setDashboardUser,
  setDashboardSelectedDeviceIdChart,
  setDashboardSelectedDeviceIdDataTable,
  setDashboardSelectedDeviceIdInformaton,
} = dashboardSlice.actions;
