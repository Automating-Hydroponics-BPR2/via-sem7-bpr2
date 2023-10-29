import { DeviceReading } from '../../models/device';

export interface IDataTableProps {
  data: DeviceReading[];
  height: number;
  width: number;

  type?: string;
  deviceIds?: string[];
  selectedDeviceId?: string;

  setType: (type: string) => void;
  setSelectedDeviceId: (deviceId: string) => void;
}
