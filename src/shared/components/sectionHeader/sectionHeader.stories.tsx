import { StoryObj } from '@storybook/react';
import { SectionHeader } from './sectionHeader';
import { ISectionHeaderProps } from './sectionHeader.props';
import { NavigateFunction } from 'react-router-dom';

export default {
  title: 'SectionHeader',
  component: SectionHeader,
};

type Story = StoryObj<typeof SectionHeader>;

export const SectionHeaderWithThresholdStory: Story = () => {
  const sectionHeaderProps: ISectionHeaderProps = {
    title: 'Section Header',
    deviceIds: ['device1', 'device2', 'device3'],
    selectedDeviceId: 'device1',
    setSelectedDeviceId: (navigate: NavigateFunction, deviceId: string) => {
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

SectionHeaderWithThresholdStory.storyName = 'Section Header with treshold';

export const SectionHeaderWithTypeStory: Story = () => {
  const sectionHeaderProps: ISectionHeaderProps = {
    title: 'Section Header',
    deviceIds: ['device1', 'device2', 'device3'],
    selectedDeviceId: 'device1',
    setSelectedDeviceId: (navigate: NavigateFunction, deviceId: string) => {
      alert(deviceId);
    },
    type: 'Choose a type',
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

SectionHeaderWithTypeStory.storyName = 'Section Header with type';

export const SectionHeaderWithDateFilterStory: Story = () => {
  const sectionHeaderProps: ISectionHeaderProps = {
    title: 'Section Header',
    deviceIds: ['device1', 'device2', 'device3'],
    selectedDeviceId: 'device1',
    setSelectedDeviceId: (navigate: NavigateFunction, deviceId: string) => {
      alert(deviceId);
    },
    type: 'Choose a type',
    setType: (type: string) => {
      console.log(type);
    },
    dateFilterLabel: 'Choose a date',
    setDateFilterLabel: (dateFilter: string) => {
      console.log(dateFilter);
    },
    setDateFilter: (dateFilter: { start: number; end: number }) => {
      console.log(dateFilter);
    },
  };

  return (
    <div style={{ width: '900px', height: '100%', margin: '0 auto' }}>
      <SectionHeader {...sectionHeaderProps} />
    </div>
  );
};

SectionHeaderWithDateFilterStory.storyName = 'Section Header with date filter';
