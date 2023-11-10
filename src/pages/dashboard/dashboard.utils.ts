import { DeviceReading, FilterType, FilteredDeviceReading } from '../../shared';

export const convertToChartData = (data: DeviceReading) => {
  return [
    {
      name: 'ph',
      value: data.ph,
    },
    {
      name: 'light',
      value: data.light,
    },
    {
      name: 'temp',
      value: data.temp,
    },
    {
      name: 'waterTemp',
      value: data.waterTemp,
    },
    {
      name: 'humidity',
      value: data.humidity,
    },
  ];
};

export const convertTimestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const filterDataTableDataForType = (type: FilterType, data: DeviceReading[]) => {
  return data.map((item: DeviceReading) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const filteredItem = {
      timestamp: convertTimestampToDate(item.timestamp as number),
      [type]: item[type],
    } as FilteredDeviceReading;

    return filteredItem;
  });
};
