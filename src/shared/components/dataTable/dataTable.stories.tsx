import { StoryObj } from '@storybook/react';
import { DataTable } from './dataTable';

export default {
  title: 'DataTable',
  // Though optional, `component` is required to fully populate ArgsTable
  component: DataTable,
};
type Story = StoryObj<typeof DataTable>;

export const DataTableStory: Story = () => {
  const unixTimestamp = 1633824000000;
  const data = [
    {
      id: '1',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '2',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '3',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '4',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '5',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '6',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '7',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '8',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '9',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
    {
      id: '10',
      deviceId: '2',
      name: 'Device 2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: unixTimestamp,
    },
  ];
  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <DataTable data={data} height={'200px'} width={'100%'} />
    </div>
  );
};

DataTableStory.storyName = 'DataTable';
