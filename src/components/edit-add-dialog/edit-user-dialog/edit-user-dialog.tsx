import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogProps, Snackbar, User } from '../../../shared';
import { IEditUserDialogProps } from './edit-user-dialog.props';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Container, CssBaseline, Avatar, Box, Typography, TextField } from '@mui/material';
import { isEmailValid } from '../../../pages/authentication/register/register.utils';

export const EditUserDialog = (props: IEditUserDialogProps) => {
  const theme = useTheme();
  const { open, onClose, user, onUserEdit, navigate } = props;
  const [alertOpen, setAlertOpen] = useState(false);
  const [formState, setFormState] = useState<Partial<User>>({
    username: user?.username ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
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
    return (
      formState.username !== user?.username ||
      formState.firstName !== user?.firstName ||
      formState.lastName !== user?.lastName ||
      formState.email !== user?.email
    );
  };

  const handleSave = () => {
    if (validateForm() && checkIfFormChanged()) {
      if (onUserEdit) {
        onUserEdit(navigate, {
          username: formState.username === user?.username ? undefined : formState.username,
          firstName: formState.firstName === user?.firstName ? undefined : formState.firstName,
          lastName: formState.lastName === user?.lastName ? undefined : formState.lastName,
          email: formState.email === user?.email ? undefined : formState.email,
        });
      }
      onClose();
    } else {
      setAlertOpen(true); // Display Snackbar if validation fails
    }
  };
  const validateForm = () => {
    return (
      formState.username &&
      formState.firstName &&
      formState.lastName &&
      formState.email &&
      formState.username.match(/^[a-zA-Z0-9- ]+$/) &&
      formState.username.length >= 3 &&
      formState.username.length <= 21 &&
      (formState.firstName === '' ||
        (formState.firstName.match(/^[a-zA-Z0-9 ]+$/) &&
          formState.firstName.length >= 3 &&
          formState.firstName.length <= 21)) &&
      (formState.lastName === '' ||
        (formState.lastName.match(/^[a-zA-Z0-9 ]+$/) &&
          formState.lastName.length >= 3 &&
          formState.lastName.length <= 21)) &&
      (formState.email === '' || isEmailValid(formState.email) === 'Email can be inserted')
    );
  };
  const dialogProps: DialogProps = {
    open,
    onClose,
    title: 'Edit user dialog',
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
            {`Edit your information`}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              onChange={handleChange}
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              defaultValue={user?.username ?? ''}
              autoFocus
              error={
                formState.username !== undefined &&
                formState.username !== '' &&
                (!formState.username.match(/^[a-zA-Z0-9- ]+$/) ||
                  formState.username.length < 3 ||
                  formState.username.length > 21)
              }
              helperText={
                formState.username && formState.username !== ''
                  ? formState.username.match(/^[a-zA-Z0-9- ]+$/) &&
                    formState.username.length >= 3 &&
                    formState.username.length <= 21
                    ? 'Username can be inserted'
                    : 'Cannot be less than 3 characters, contain special characters or be more than 21 characters'
                  : 'This field is optional'
              }
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              defaultValue={user?.email ?? ''}
              autoFocus
              error={
                formState.email !== undefined &&
                formState.email !== '' &&
                isEmailValid(formState.email) !== 'Email can be inserted'
              }
              helperText={formState.email && isEmailValid(formState.email)}
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              defaultValue={user?.firstName ?? ''}
              autoFocus
              error={
                formState.firstName !== '' &&
                formState.firstName !== undefined &&
                (!formState.firstName.match(/^[a-zA-Z0-9 ]+$/) ||
                  formState.firstName.length < 3 ||
                  formState.firstName.length > 21)
              }
              helperText={
                formState.firstName && formState.firstName !== ''
                  ? formState.firstName.match(/^[a-zA-Z0-9 ]+$/) &&
                    formState.firstName.length >= 3 &&
                    formState.firstName.length <= 21
                    ? 'First name can be inserted'
                    : 'Cannot be less than 3 characters, contain special characters or be more than 21 characters'
                  : 'This field is optional'
              }
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              defaultValue={user?.lastName ?? ''}
              autoFocus
              error={
                formState.lastName !== '' &&
                formState.lastName !== undefined &&
                (!formState.lastName.match(/^[a-zA-Z0-9 ]+$/) ||
                  formState.lastName.length < 3 ||
                  formState.lastName.length > 21)
              }
              helperText={
                formState.lastName && formState.lastName !== ''
                  ? formState.lastName.match(/^[a-zA-Z0-9 ]+$/) &&
                    formState.lastName.length >= 3 &&
                    formState.lastName.length <= 21
                    ? 'Last name can be inserted'
                    : 'Cannot be less than 3 characters, contain special characters or be more than 21 characters'
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
