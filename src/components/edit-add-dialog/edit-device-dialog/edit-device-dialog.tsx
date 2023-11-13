import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogProps, Snackbar } from '../../../shared';
import { IEditDeviceDialogProps } from './edit-device-dialog.props';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Container, CssBaseline, Avatar, Box, Typography, TextField } from '@mui/material';

export const EditDeviceDialog = (props: IEditDeviceDialogProps) => {
  const theme = useTheme();
  const { open, onClose, device, onDeviceEdit, navigate } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [formState, setFormState] = useState({
    deviceId: device?.deviceId ?? '',
    name: device?.name ?? '',
  });

  const handleCloseAlert = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const checkIfFormChanged = () => {
    return formState.deviceId !== device?.deviceId || formState.name !== device?.name;
  };

  const handleSave = () => {
    if (validateForm() && checkIfFormChanged()) {
      if (onDeviceEdit && device) {
        onDeviceEdit(navigate, device?.id, {
          deviceId: formState.deviceId,
          name: formState.name,
        });
      }

      onClose();
    } else {
      setAlertOpen(true); // Display Snackbar if validation fails
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
    title: 'Edit device',
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
            <ModeEditOutlineOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {device ? `${device.deviceId}` : ''}
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
              defaultValue={device?.deviceId ?? ''}
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
              defaultValue={device?.name ?? ''}
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
    options: ['Save', 'Cancel'],
    onOptionClick: (option: string) => {
      switch (option) {
        case 'Save':
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
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        type="info"
        message="Form is empty or invalid"
      />
    </div>
  );
};
