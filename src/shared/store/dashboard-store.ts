import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface DashboardStore {
  isLoading: boolean;
  threshold: number;
  type: string;
  selectedDeviceIdChart?: string;
  selectedDeviceIdDataTable?: string;
  selectedDeviceIdInformaton?: string;
}

const initialState: DashboardStore = {
  type: 'Choose a type',
  isLoading: false,
  threshold: 60,
  selectedDeviceIdChart: undefined,
  selectedDeviceIdDataTable: undefined,
  selectedDeviceIdInformaton: undefined,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
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
    resetDashboardStore(state) {
      state = initialState;
    },
  },
});

export default dashboardSlice.reducer;
export const {
  resetDashboardStore,
  setDashboardType,
  setDashboardIsLoading,
  setDashboardThreshold,
  setDashboardSelectedDeviceIdChart,
  setDashboardSelectedDeviceIdDataTable,
  setDashboardSelectedDeviceIdInformaton,
} = dashboardSlice.actions;
