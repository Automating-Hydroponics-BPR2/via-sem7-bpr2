import { StoryObj } from '@storybook/react';
import { Chart } from './chart';

export default {
  title: 'Chart',
  // Though optional, `component` is required to fully populate ArgsTable
  component: Chart,
};
type Story = StoryObj<typeof Chart>;

export const ChartStory: Story = () => {
  const data = [
    { name: 'ph', value: '20' },
    { name: 'light', value: '30' },
    { name: 'temp', value: '10' },
    { name: 'waterTemp', value: '40' },
    { name: 'humidity', value: '55' },
  ];
  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <Chart
        threshold={60}
        data={data}
        width={100}
        height={200}
      />
    </div>
  );
};

ChartStory.storyName = 'Chart';
