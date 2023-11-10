export interface DeviceModel {
  deviceId: string;
  name: string;
}

export interface CreatedDeviceModel extends DeviceModel {
  id: string;
}

export interface DeviceReading {
  id: string;
  deviceId: string;
  name: string;
  temp: string;
  humidity: string;
  ph: string;
  waterTemp: string;
  light: string;
  timestamp: number | string;
}

export interface DateFilter {
  start: number;
  end: number;
}
