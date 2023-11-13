export interface DeviceModel {
  deviceId: string;
  name: string;
}

export interface CreatedDeviceModel extends DeviceModel {
  id: string;
}

export enum FilterType {
  TEMP = 'temp',
  HUMIDITY = 'humidity',
  PH = 'ph',
  WATERTEMP = 'waterTemp',
  LIGHT = 'light',
}

// Define FilteredDeviceReading using a mapped type
export type FilteredDeviceReading = {
  timestamp: number | string;
} & {
  [key in FilterType]: string;
};

// Type to omit a specific property from an object
type OmitProperty<T, K extends keyof T> = Omit<T, K>;

// DeviceReading without the dynamically changed property
export interface DeviceReading extends OmitProperty<FilteredDeviceReading, FilterType> {
  id: string;
  deviceId: string;
  [FilterType.TEMP]: string;
  [FilterType.HUMIDITY]: string;
  [FilterType.PH]: string;
  [FilterType.WATERTEMP]: string;
  [FilterType.LIGHT]: string;
}

export interface DateFilter {
  start: number;
  end: number;
}
