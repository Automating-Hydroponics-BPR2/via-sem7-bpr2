import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogProps } from '../../../shared';
import { IEditAddDialogDeviceProps } from './edit-add-device-dialog.props';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Container, CssBaseline, Avatar, Box, Typography, TextField } from '@mui/material';

export const EditAddDeviceDialog = (props: IEditAddDialogDeviceProps) => {
  const theme = useTheme();
  const { open, onClose, device, isAddDevice, onDeviceEdit, onDeviceAdd } = props;
  const [formState, setFormState] = useState({
    deviceId: isAddDevice ? '' : device?.deviceId ?? '',
    name: isAddDevice ? '' : device?.name ?? '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const handleSave = () => {
    if (validateForm()) {
      if (!isAddDevice && onDeviceEdit) {
        onDeviceEdit(formState.deviceId, {
          deviceId: formState.deviceId,
          name: formState.name,
        });
      } else if (isAddDevice && onDeviceAdd) {
        onDeviceAdd({
          deviceId: formState.deviceId,
          name: formState.name,
        });
      }
      onClose();
    }
  };
  const validateForm = () => {
    return (
      formState.deviceId.match(/^[a-zA-Z0-9-]+$/) &&
      formState.deviceId.length >= 10 &&
      formState.deviceId.length <= 20 &&
      (formState.name === '' ||
        (formState.name.match(/^[a-zA-Z0-9 ]+$/) && formState.name.length >= 10 && formState.name.length <= 20))
    );
  };
  const dialogProps: DialogProps = {
    open,
    onClose,
    title: isAddDevice ? 'Add a new device' : 'Edit device',
    children: (
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: theme.palette.text.primary }}>
            {!isAddDevice ? <ModeEditOutlineOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {!isAddDevice ? (device ? `${device.deviceId}` : '') : 'Add a new device'}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="deviceId"
              label="Device id"
              name="deviceId"
              defaultValue={!isAddDevice ? device?.deviceId ?? '' : ''}
              autoFocus
              error={
                formState.deviceId !== '' &&
                (!formState.deviceId.match(/^[a-zA-Z0-9-]+$/) ||
                  formState.deviceId.length < 10 ||
                  formState.deviceId.length > 20)
              }
              helperText={
                formState.deviceId !== ''
                  ? formState.deviceId.match(/^[a-zA-Z0-9-]+$/) &&
                    formState.deviceId.length >= 10 &&
                    formState.deviceId.length <= 20
                    ? 'Id can be inserted'
                    : 'Cannot be less than 10 characters, contain special characters or be more than 20 characters'
                  : 'This field is required'
              }
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              defaultValue={!isAddDevice ? device?.name ?? '' : ''}
              autoFocus
              error={
                formState.name !== '' &&
                (!formState.name.match(/^[a-zA-Z0-9 ]+$/) || formState.name.length < 10 || formState.name.length > 20)
              }
              helperText={
                formState.name !== ''
                  ? formState.name.match(/^[a-zA-Z0-9 ]+$/) &&
                    formState.name.length >= 10 &&
                    formState.name.length <= 20
                    ? 'Name can be inserted'
                    : 'Cannot be less than 10 characters, contain special characters or be more than 20 characters'
                  : 'This field is optional'
              }
            />
          </Box>
        </Box>
      </Container>
    ),
    options: [!isAddDevice ? 'Save' : 'Add', 'Cancel'],
    onOptionClick: (option: string) => {
      switch (option) {
        case 'Save':
        case 'Add':
          handleSave();
          break;
        case 'Cancel':
          onClose();
          break;
        default:
          break;
      }
    },
    width: '500px',
  };
  return (
    <div>
      <Dialog {...dialogProps} />
    </div>
  );
};
