import { AuthenticatedUser, DeviceModel } from '../../shared';
import { DeviceReading } from '../../shared/models/device';

export interface DashboardProps {
  device?: DeviceModel;
  readingsList?: DeviceReading[];
  user?: AuthenticatedUser;
  isLoading: boolean;

  setDevice: (device: DeviceModel) => void;
  setReadingsList: (readingsList: DeviceReading[]) => void;
}
