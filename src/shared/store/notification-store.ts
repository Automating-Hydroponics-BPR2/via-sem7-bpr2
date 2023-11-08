import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TNotification, TSnackbar } from '../models';

export interface NotificationStore {
  notifications: TNotification[];
  snackbar: TSnackbar;
}

const initialState: NotificationStore = {
  notifications: [],
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
    setNotifications(state, action: PayloadAction<TNotification[]>) {
      state.notifications = action.payload;
    },
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
    addANotification(state, action: PayloadAction<TNotification>) {
      state.notifications.push(action.payload);
    },
    markANotificationAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find((notification) => notification.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    removeANotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload);
    },
  },
});

export default notificationSlice.reducer;
export const {
  setNotifications,
  setSnackbar,
  setSnackbarVisibility,
  setSnackbarMessage,
  setSnackbarType,
  addANotification,
  markANotificationAsRead,
  removeANotification,
} = notificationSlice.actions;
