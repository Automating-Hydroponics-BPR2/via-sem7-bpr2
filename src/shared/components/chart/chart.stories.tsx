import { StoryObj } from '@storybook/react';
import { BarChartWithReferenceLine } from './chart';

export default {
  title: 'Chart',
  // Though optional, `component` is required to fully populate ArgsTable
  component: BarChartWithReferenceLine,
};
type Story = StoryObj<typeof BarChartWithReferenceLine>;

export const BarChartStory: Story = () => {
  const data = [
    { name: 'ph', value: '20' },
    { name: 'light', value: '30' },
    { name: 'temp', value: '10' },
    { name: 'waterTemp', value: '40' },
    { name: 'humidity', value: '55' },
  ];
  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <BarChartWithReferenceLine data={data} width={'100%'} height={250} />
    </div>
  );
};

BarChartStory.storyName = 'SimpleBarChart';
