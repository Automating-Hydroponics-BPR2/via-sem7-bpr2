import { StoryObj } from '@storybook/react';
import { SectionHeader } from './sectionHeader';
import { ISectionHeaderProps } from './sectionHeader.props';

export default {
  title: 'SectionHeader',
  component: SectionHeader,
};

type Story = StoryObj<typeof SectionHeader>;

export const SectionHeaderStory: Story = () => {
  const sectionHeaderProps: ISectionHeaderProps = {
    title: 'Section Header',
    deviceIds: ['device1', 'device2', 'device3'],
    selectedDeviceId: 'device1',
    setSelectedDeviceId: (deviceId: string) => {
      alert(deviceId);
    },
    threshold: 10,
    setThreshold: (threshold: number) => {
      alert(threshold);
    },
    type: 'light',
    setType: (type: string) => {
      alert(type);
    },
  };

  return (
    <div style={{ width: '900px', height: '100%', margin: '0 auto' }}>
      <SectionHeader {...sectionHeaderProps} />
    </div>
  );
};

SectionHeaderStory.storyName = 'Section Header';
