import { useState } from 'react';
import { Dialog } from './dialog';
import { DialogProps } from './dialog.props';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Dialog',
  component: Dialog,
};

type Story = StoryObj<typeof Dialog>;

export const DialogStory: Story = () => {
  const [open, setOpen] = useState(false);

  const dialogProps: DialogProps = {
    open,
    onClose: () => {
      setOpen(false);
    },
    title: 'Dialog title',
    children: [
      <div key="1">Dialog body</div>,
      <div key="2">Dialog body</div>,
      <div key="3">Dialog body</div>,
      <div key="4">Dialog body</div>,
      <div key="5">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="6">Dialog body</div>,
      <div key="7">Dialog body</div>,
      <div key="8">Dialog body</div>,
    ],
    options: ['Save', 'Close'],
    onOptionClick: (option: string) => {
      alert(option);
      setOpen(false);
    },
    width: '500px',
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}>
        Open
      </button>
      <Dialog {...dialogProps} />
    </div>
  );
};

DialogStory.storyName = 'Dialog';

export const ConfirmationDialogStory: Story = () => {
  const [open, setOpen] = useState(false);

  const dialogProps: DialogProps = {
    open,
    onClose: () => {
      setOpen(false);
    },
    title: 'Are you sure you want to delete this device?',
    children: [
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>
    ],
    options: ['Confirm', 'Cancel'],
    onOptionClick: (option: string) => {
      alert(option);
      setOpen(false);
    },
    width: '500px',
    height: '200px',
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}>
        Open
      </button>
      <Dialog {...dialogProps} />
    </div>
  );
};

ConfirmationDialogStory.storyName = 'Confirmation Dialog';