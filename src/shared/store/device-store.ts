import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DeviceModel, DeviceReading } from '../models/device';

export interface DeviceStore {
  device?: DeviceModel;
  readingsList?: DeviceReading[];
}

const initialState: DeviceStore = {
  device: undefined,
  readingsList: undefined,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevice(state, action: PayloadAction<DeviceModel>) {
      state.device = action.payload;
    },
    setReadingsList(state, action: PayloadAction<DeviceReading[]>) {
      state.readingsList = action.payload;
    },
    resetDevice(state) {
      state = initialState;
    },
  },
});

export default deviceSlice.reducer;
export const { setDevice, resetDevice, setReadingsList } = deviceSlice.actions;
