import { useState } from 'react';
import { Dialog } from './dialog';
import { DialogProps } from './dialog.props';
import { StoryObj } from '@storybook/react';
import {
  EditUserDialog,
  IEditDeviceDialogProps,
  NotificationDialog,
  IEditUserDialogProps,
  INotificationsDialogProps,
  EditDeviceDialog,
  AddDeviceDialog,
  IAddDeviceDialogProps,
} from '../../../components';
import { Priority } from '../../models/notification';

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
      </div>,
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

export const AddDeviceDialogStory: Story = () => {
  const [open, setOpen] = useState(false);
  const addDialogProps: IAddDeviceDialogProps = {
    open,
    onClose: () => {
      setOpen(false);
    },
    onDeviceAdd: (device) => {
      alert(JSON.stringify(device));
      setOpen(false);
    },
    navigate: () => {
      console.log('navigate');
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}>
        Add
      </button>
      <AddDeviceDialog {...addDialogProps} />
    </div>
  );
};

AddDeviceDialogStory.storyName = 'Add Device Dialog';

export const EditDeviceDialogStory: Story = () => {
  const [open, setOpen] = useState(false);
  const editDialogProps: IEditDeviceDialogProps = {
    device: {
      id: '16ff7a57-2ff3-4dd5-9214-f9826473dd05',
      deviceId: '1',
      name: 'test',
    },
    open,
    onClose: () => {
      setOpen(false);
    },
    onDeviceEdit: (device) => {
      alert(JSON.stringify(device));
      setOpen(false);
    },
    navigate: () => {
      console.log('navigate');
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}>
        Edit
      </button>
      <EditDeviceDialog {...editDialogProps} />
    </div>
  );
};

EditDeviceDialogStory.storyName = 'Edit Device Dialog';

export const EditUserDialogStory: Story = () => {
  const [open, setOpen] = useState(false);
  const editAddDialogProps: IEditUserDialogProps = {
    user: {
      id: '1',
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@testov.abv',
      iat: 1,
      exp: 1,
    },
    open,
    onClose: () => {
      setOpen(false);
    },
    onUserEdit: (user) => {
      alert(JSON.stringify(user));
      setOpen(false);
    },
    navigate: () => {
      console.log('navigate');
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}>
        Edit
      </button>
      <EditUserDialog {...editAddDialogProps} />
    </div>
  );
};

EditUserDialogStory.storyName = 'Edit User Dialog';

export const NotificationDialogStory: Story = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'test',
      description: 'This is a test notification, by the way!',
      priority: Priority.LOW,
      // I need this date to be in Date format but to be in the past
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      read: false,
    },
    {
      id: '2',
      title: 'test',
      description: 'This is a test notification, by the way!',
      priority: Priority.HIGH,
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      read: false,
    },
    {
      id: '3',
      title: 'test',
      description: 'This is a test notification, by the way!',
      priority: Priority.LOW,
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      read: false,
    },
    {
      id: '4',
      title: 'test',
      description: 'This is a test notification, by the way!',
      priority: Priority.HIGH,
      date: new Date(new Date().setDate(new Date().getDate() - 4)),
      read: false,
    },
    {
      id: '5',
      title: 'test',
      description:
        'This is a test notifThis is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!ication, by the way!',
      priority: Priority.LOW,
      date: new Date(new Date().setDate(new Date().getDate() - 5)),
      read: false,
    },
    {
      id: '6',
      title: 'test',
      description: 'This is a test notification, by the way!',
      priority: Priority.HIGH,
      date: new Date(),
      read: false,
    },
    {
      id: '7',
      title: 'test',
      description:
        'This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!',
      priority: Priority.HIGH,
      date: new Date(new Date().setDate(new Date().getDate() - 10)),
      read: false,
    },
    {
      id: '8',
      title: 'test',
      description:
        'This is a test notifThis is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!This is a test notification, by the way!ication, by the way!',
      priority: Priority.HIGH,
      date: new Date(),
      read: false,
    },
  ]);
  const notificationDialogProps: INotificationsDialogProps = {
    notifications,
    open,
    onClose: () => {
      setOpen(false);
    },
    onMarkAsRead: (id) => {
      const newNotifications = [...notifications];
      const index = newNotifications.findIndex((notification) => notification.id === id);
      newNotifications[index].read = true;
      setNotifications(newNotifications);
    },
    onDelete: (id) => {
      const newNotifications = [...notifications];
      const index = newNotifications.findIndex((notification) => notification.id === id);
      newNotifications.splice(index, 1);
      setNotifications(newNotifications);
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          setOpen(true);
        }}>
        Open
      </button>
      <NotificationDialog {...notificationDialogProps} />
    </div>
  );
};

NotificationDialogStory.storyName = 'Notification Dialog';
