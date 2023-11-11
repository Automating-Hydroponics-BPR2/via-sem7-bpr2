import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CreatedDeviceModel, DeviceReading } from '../models/device';

export interface DeviceStore {
  deviceIds?: string[];
  device?: CreatedDeviceModel;
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
    setDevice(state, action: PayloadAction<CreatedDeviceModel | undefined>) {
      if (action.payload) {
        state.device = action.payload;
      } else {
        state.deviceIds?.filter((id) => id !== state.device?.id);
        state.device = undefined;
      }
    },
    setHistoricalReadings(state, action: PayloadAction<DeviceReading[]>) {
      state.historicalReadings = action.payload;
    },
    setDeviceIds(state, action: PayloadAction<string[]>) {
      state.deviceIds = action.payload;
    },
    addADeviceId(state, action: PayloadAction<string>) {
      if (state.deviceIds) {
        state.deviceIds.push(action.payload);
      } else {
        state.deviceIds = [action.payload];
      }
    },
    removeADeviceId(state, action: PayloadAction<string>) {
      if (state.deviceIds) {
        state.deviceIds = state.deviceIds.filter((id) => id !== action.payload);
      }
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
export const {
  setDevice,
  resetDeviceStore,
  setCurrentReading,
  setDeviceIds,
  setHistoricalReadings,
  addADeviceId,
  removeADeviceId,
} = deviceSlice.actions;
