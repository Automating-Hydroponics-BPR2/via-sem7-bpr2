import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DateFilter } from '../models';

export interface DashboardStore {
  type: string;
  threshold: number;
  isLoading: boolean;
  dateFilter: DateFilter;
  dateFilterLabel: string;
  selectedDeviceIdChart?: string;
  selectedDeviceIdDataTable?: string;
  selectedDeviceIdInformaton?: string;
}

const initialState: DashboardStore = {
  threshold: 60,
  isLoading: false,
  type: 'Choose a type',
  dateFilter: {
    start: new Date().getTime(),
    end: new Date().setHours(0, 0, 0, 0) - 604800000,
  },
  dateFilterLabel: 'Choose a date',
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
    setDashboardDateFilterLabel(state, action: PayloadAction<string>) {
      state.dateFilterLabel = action.payload;
    },
    setDashboardDateFilter(state, action: PayloadAction<DateFilter>) {
      state.dateFilter = action.payload;
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
  setDashboardDateFilter,
  setDashboardDateFilterLabel,
  setDashboardSelectedDeviceIdChart,
  setDashboardSelectedDeviceIdDataTable,
  setDashboardSelectedDeviceIdInformaton,
} = dashboardSlice.actions;
