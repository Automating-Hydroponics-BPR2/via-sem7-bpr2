import { type RouterState } from 'connected-react-router';
import { type NotificationStore } from './notification-store';
import { ThemeStore } from './theme-store';
import { UserStore } from './user-store';
import { DeviceStore } from './device-store';
import { DashboardStore } from './dashboard-store';

export interface ApplicationState {
  router: RouterState;
  notifications: NotificationStore;
  theme: ThemeStore;
  dashboard: DashboardStore;
  user: UserStore;
  device: DeviceStore;
}
