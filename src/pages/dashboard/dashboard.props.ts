import { NavigateFunction } from 'react-router-dom';
import { AuthenticatedUser, DeviceModel, User } from '../../shared';
import { CreatedDeviceModel, DateFilter, DeviceReading } from '../../shared/models/device';

export interface DashboardProps {
  threshold: number;
  isLoading: boolean;

  type?: string;
  device?: CreatedDeviceModel;
  deviceIds?: string[];
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
  setSelectedDeviceIdChart: (navigate: NavigateFunction, deviceId: string) => void;
  setSelectedDeviceIdDataTable: (navigate: NavigateFunction, deviceId: string, dateFilter?: DateFilter) => void;
  setSelectedDeviceIdInformaton: (navigate: NavigateFunction, deviceId: string) => void;

  // Services
  // Device
  getDeviceIds: (navigate: NavigateFunction) => void;
  deleteDeviceWithId: (navigate: NavigateFunction, id: string) => void;
  createDevice: (navigate: NavigateFunction, deviceData: DeviceModel) => void;
  updateDeviceWithId: (navigate: NavigateFunction, id: string, deviceData: DeviceModel) => void;

  // User
  deleteUserWithId: (navigate: NavigateFunction) => void;
  updateUserWithId: (navigate: NavigateFunction, userData: Partial<User>) => void;
}
