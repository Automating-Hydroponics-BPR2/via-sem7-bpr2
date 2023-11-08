import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DeviceModel, DeviceReading } from '../models/device';

export interface DeviceStore {
  deviceIds?: string[];
  device?: DeviceModel;
  historicalReadings?: DeviceReading[];
  currentReading?: DeviceReading;
}

const initialState: DeviceStore = {
  device: undefined,
  deviceIds: undefined,
  currentReading: undefined,
  historicalReadings: undefined,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevice(state, action: PayloadAction<DeviceModel>) {
      state.device = action.payload;
    },
    setHistoricalReadings(state, action: PayloadAction<DeviceReading[]>) {
      state.historicalReadings = action.payload;
    },
    setDeviceIds(state, action: PayloadAction<string[]>) {
      state.deviceIds = action.payload;
    },
    setCurrentReading(state, action: PayloadAction<DeviceReading>) {
      state.currentReading = action.payload;
    },
    resetDeviceStore(state) {
      state = initialState;
    },
  },
});

export default deviceSlice.reducer;
export const { setDevice, resetDeviceStore, setCurrentReading, setDeviceIds, setHistoricalReadings } =
  deviceSlice.actions;
