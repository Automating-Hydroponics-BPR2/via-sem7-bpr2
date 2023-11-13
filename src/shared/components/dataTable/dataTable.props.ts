import { DeviceReading, FilteredDeviceReading } from '../../models/device';

export interface IDataTableProps {
  data: DeviceReading[] | FilteredDeviceReading[];
  filterType?: string;
  height: string;
  width: string;
}
