import { AuthenticatedUser, DeviceModel } from '../../shared';
import { DeviceReading } from '../../shared/models/device';

export interface DashboardProps {
  threshold: number;
  isLoading: boolean;

  type?: string;
  deviceIds?: string[];
  device?: DeviceModel;
  user?: AuthenticatedUser;
  selectedDeviceId?: string;
  readingsList?: DeviceReading[];

  reset: () => void;
  setType: (type: string) => void;
  setDevice: (device: DeviceModel) => void;
  setThreshold: (treshold: number) => void;
  setUser: (user: AuthenticatedUser) => void;
  setIsLoading: (isLoading: boolean) => void;
  setDeviceIds: (deviceIds: string[]) => void;
  setSelectedDeviceId: (deviceId: string) => void;
  setReadingsList: (readingsList: DeviceReading[]) => void;
}
