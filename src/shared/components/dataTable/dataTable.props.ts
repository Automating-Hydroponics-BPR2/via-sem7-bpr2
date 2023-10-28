import { DeviceReading } from '../../models/device';

export interface IDataTableProps {
  deviceId: string;
  deviceName: string;
  data: DeviceReading[];
  height: number;
  width?: string | number;
}
