import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogProps } from '../../../shared';
import { IEditAddDialogDeviceProps } from './edit-add-device-dialog.props';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Container, CssBaseline, Avatar, Box, Typography, TextField } from '@mui/material';

export const EditAddDeviceDialog = (props: IEditAddDialogDeviceProps) => {
  const theme = useTheme();
  const { open, onClose, device, onDeviceEdit } = props;
  const [formState, setFormState] = useState({
    id: device?.id ?? '',
    name: device?.name ?? '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };
  const handleSave = () => {
    if (validateForm()) {
      if (onDeviceEdit) {
        onDeviceEdit(formState.id, {
          id: formState.id,
          name: formState.name,
        });
      }
      onClose();
    }
  };
  const validateForm = () => {
    return (
      formState.id.match(/^[a-zA-Z0-9-]+$/) &&
      formState.id.length >= 10 &&
      formState.id.length <= 20 &&
      (formState.name === '' ||
        (formState.name.match(/^[a-zA-Z0-9 ]+$/) && formState.name.length >= 10 && formState.name.length <= 20))
    );
  };
  const dialogProps: DialogProps = {
    open,
    onClose,
    title: device ? 'Edit device dialog' : 'Add device dialog',
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
            {device ? <ModeEditOutlineOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {device ? `${device.id}` : 'Add a new device'}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="id"
              label="Id"
              name="id"
              defaultValue={device?.id ?? ''}
              autoFocus
              error={
                formState.id !== '' &&
                (!formState.id.match(/^[a-zA-Z0-9-]+$/) || formState.id.length < 10 || formState.id.length > 20)
              }
              helperText={
                formState.id !== ''
                  ? formState.id.match(/^[a-zA-Z0-9-]+$/) && formState.id.length >= 10 && formState.id.length <= 20
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
    options: [device ? 'Save' : 'Add', 'Cancel'],
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
