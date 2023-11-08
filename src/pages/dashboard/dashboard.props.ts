import { AuthenticatedUser, DeviceModel, User } from '../../shared';
import { DeviceReading } from '../../shared/models/device';

export interface DashboardProps {
  threshold: number;
  isLoading: boolean;

  type?: string;
  device?: DeviceModel;
  deviceIds?: string[];
  user?: AuthenticatedUser;
  currentReading?: DeviceReading;
  historicalReadings?: DeviceReading[];
  selectedDeviceIdChart?: string;
  selectedDeviceIdDataTable?: string;
  selectedDeviceIdInformaton?: string;

  // Actions
  reset: () => void;
  setType: (type: string) => void;
  setThreshold: (treshold: number) => void;
  setSelectedDeviceIdChart: (deviceId: string) => void;
  setSelectedDeviceIdDataTable: (deviceId: string) => void;
  setSelectedDeviceIdInformaton: (deviceId: string) => void;

  // Services
  // Device
  getDeviceIds: () => void;
  getDeviceWithId: (id: string) => void;
  getCurrentReading: (id: string) => void;
  createDevice: (deviceData: DeviceModel) => void;
  updateDeviceWithId: (id: string, deviceData: DeviceModel) => void;
  deleteDeviceWithId: (id: string) => void;

  // User
  deleteUserWithId: () => void;
  updateUserWithId: (userData: User) => void;
}
