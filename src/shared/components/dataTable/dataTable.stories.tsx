import { StoryObj } from '@storybook/react';
import { DataTable } from './dataTable';

export default {
  title: 'DataTable',
  // Though optional, `component` is required to fully populate ArgsTable
  component: DataTable,
};
type Story = StoryObj<typeof DataTable>;

export const DataTableStory: Story = () => {
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
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
      timestamp: '2021-10-10T00:00:00.000Z',
    },
  ];
  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <DataTable
        data={data}
        height={350}
        width={100}
        setType={() => {
          console.log('setType');
        }}
        setSelectedDeviceId={() => {
          console.log('setSelectedDeviceId');
        }}
        selectedDeviceId={'1'}
        deviceIds={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
      />
    </div>
  );
};

DataTableStory.storyName = 'DataTable';
