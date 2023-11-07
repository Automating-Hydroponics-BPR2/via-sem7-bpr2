import { DeviceReading } from '../../shared';

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

export const convertTimestampToDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
