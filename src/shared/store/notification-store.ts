import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TSnackbar } from '../models';

export interface NotificationStore {
  snackbar: TSnackbar;
}

const initialState: NotificationStore = {
  snackbar: {
    open: false,
    type: 'success',
    message: '',
  },
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setSnackbar(state, action: PayloadAction<TSnackbar>) {
      state.snackbar = action.payload;
    },
    setSnackbarType(state, action: PayloadAction<'success' | 'error'>) {
      state.snackbar.type = action.payload;
    },
    setSnackbarMessage(state, action: PayloadAction<string>) {
      state.snackbar.message = action.payload;
    },
    setSnackbarVisibility(state, action: PayloadAction<boolean>) {
      state.snackbar.open = action.payload;
    },
  },
});

export default notificationSlice.reducer;
export const { setSnackbar, setSnackbarVisibility, setSnackbarMessage, setSnackbarType } = notificationSlice.actions;
