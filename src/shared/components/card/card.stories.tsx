import { StoryObj } from '@storybook/react';
import { Card } from './card';

export default {
  title: 'Card',
  // Though optional, `component` is required to fully populate ArgsTable
  component: Card,
};
type Story = StoryObj<typeof Card>;

export const CardStory: Story = () => {
  return (
    <div style={{ maxWidth: 900, margin: '30px auto' }}>
      <Card
        key={1}
        width="462px"
        height="200px"
        id={'uuid'}
        date="Start: 29-10-2023"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velt esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        imgSource="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        title="The title of the activity the title of the activity labore the title of the activity the title of the activity"
        showEdit={true}
        showAdd={true}
        showDelete={true}
        navigate={() => {
          console.log('navigate');
        }}
      />
      <Card
        key={2}
        width="462px"
        height="200px"
        id={'uuid2'}
        description="Lorem ipsum dolor sit amt, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        imgSource="https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg"
        title="The title of the activity"
        showEdit={true}
        navigate={() => {
          console.log('navigate');
        }}
      />
      <Card
        key={3}
        width="462px"
        height="200px"
        id={'uuid3'}
        date="Start: 29-10-2023"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        title="The title of the activity"
        showEdit={true}
        showAdd={true}
        showDelete={true}
        device={{
          deviceId: 'uuid',
          name: 'Device name',
          id: 'uuid123',
        }}
        navigate={() => {
          console.log('navigate');
        }}
      />
    </div>
  );
};

CardStory.storyName = 'Card';
