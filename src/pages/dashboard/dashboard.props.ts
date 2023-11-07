import { AuthenticatedUser, DeviceModel } from '../../shared';
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

  reset: () => void;
  setType: (type: string) => void;
  setDevice: (device: DeviceModel) => void;
  setThreshold: (treshold: number) => void;
  setUser: (user: AuthenticatedUser) => void;
  setIsLoading: (isLoading: boolean) => void;
  setDeviceIds: (deviceIds: string[]) => void;
  setCurrentReading: (currentReading: DeviceReading) => void;
  setHistoricalReadings: (historicalReadings: DeviceReading[]) => void;
  setSelectedDeviceIdChart: (deviceId: string) => void;
  setSelectedDeviceIdDataTable: (deviceId: string) => void;
  setSelectedDeviceIdInformaton: (deviceId: string) => void;
}
