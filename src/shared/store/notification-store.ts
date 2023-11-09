import { v4 as uuidv4 } from 'uuid';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Priority, TNotification, TSnackbar } from '../models';

export interface NotificationStore {
  notifications: TNotification[];
  snackbar: TSnackbar;
}

const initialState: NotificationStore = {
  notifications: [
    {
      id: uuidv4(),
      title: 'Hi there!',
      description: 'Welcome to the Smart Home App! This is a notification example. If you are seeing this message you are probably reading the tooltip and you already marked this notification as read. This happens by hovering over the notification. You can also delete it by clicking on the trash icon that appears by hovering as well.',
      priority: Priority.LOW,
      read: false,
      date: new Date(),
    },
  ],
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
