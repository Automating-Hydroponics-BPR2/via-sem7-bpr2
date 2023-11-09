export interface DeviceModel {
  id: string;
  name: string;
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
  timestamp: string;
}

export interface DateFilter {
  start: number;
  end: number;
}
