import { AuthenticatedUser, DeviceModel, User } from '../../shared';
import { CreatedDeviceModel, DateFilter, DeviceReading } from '../../shared/models/device';

export interface DashboardProps {
  threshold: number;
  isLoading: boolean;

  type?: string;
  device?: CreatedDeviceModel;
  deviceIds?: string[];
  dateFilter: DateFilter;
  dateFilterLabel: string;
  user?: AuthenticatedUser;
  currentReading?: DeviceReading;
  historicalReadings?: DeviceReading[];
  selectedDeviceIdChart?: string;
  selectedDeviceIdDataTable?: string;
  selectedDeviceIdInformaton?: string;

  // Actions
  setType: (type: string) => void;
  setThreshold: (treshold: number) => void;
  setDateFilter: (dateFilter: DateFilter) => void;
  setDateFilterLabel: (dateFilter: string) => void;
  setSelectedDeviceIdChart: (deviceId: string) => void;
  setSelectedDeviceIdDataTable: (deviceId: string) => void;
  setSelectedDeviceIdInformaton: (deviceId: string) => void;

  // Services
  // Device
  getDeviceIds: () => void;
  getDeviceWithId: (id: string) => void;
  getCurrentReading: (id: string) => void;
  deleteDeviceWithId: (id: string) => void;
  createDevice: (deviceData: DeviceModel) => void;
  updateDeviceWithId: (id: string, deviceData: DeviceModel) => void;
  getHistoricalReadings: (id: string, start: number, end: number) => void;

  // User
  deleteUserWithId: () => void;
  updateUserWithId: (userData: User) => void;
}
