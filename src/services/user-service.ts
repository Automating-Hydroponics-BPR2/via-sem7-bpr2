import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  AuthenticatedUser,
  User,
  setIsLoading,
  setSnackbar,
  setUser,
  userEndpoints,
  setDashboardIsLoading,
  addANotification,
  reset,
} from '../shared';
import { Priority } from '../shared/models/notification';
import { v4 as uuidv4 } from 'uuid';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const username = (jwtDecode(token) as AuthenticatedUser).username;
  return { token, username };
};

// #region login
export const login = (username: string, password: string) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  axios
    .post(
      userEndpoints.login(),
      JSON.stringify({
        username,
        password,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then((res: any) => {
      localStorage.setItem('token', res.data.token as string);
      const user = jwtDecode(res.data.token as string) as AuthenticatedUser;
      dispatch(setUser(user));
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Login successful',
          description: `You have successfully logged in as ${user.username}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `User was signed in successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `User was not signed in!`,
        }),
      );
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Login failed',
          description: `You have failed to login as ${username}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

// #endregion

// #region register
export const register = (user: User) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  axios
    .post(userEndpoints.register(), JSON.stringify(user), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: any) => {
      localStorage.setItem('token', res.data.token as string);
      const user = jwtDecode(res.data.token as string) as AuthenticatedUser;
      dispatch(setUser(user));
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Registration successful',
          description: `You have successfully registered as ${user.username}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `User was signed up successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'Registration failed',
          description: `You have failed to register as ${user.username}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `User was not signed up!`,
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
// #endregion

// #region deleteUserWithId
export const deleteUserWithId = () => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .delete(userEndpoints.delete(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken().token}`,
      },
    })
    .then((res: any) => {
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'User deleted',
          description: `You have successfully deleted a user with username ${getToken().username}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `User was deleted successfully!`,
        }),
      );
      dispatch(reset());
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `User was not deleted!`,
        }),
      );
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'User deletion failed',
          description: `You have failed to delete a user with username ${getToken().username}!`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

// #endregion

// #region updateUserWithId
export const updateUserWithId = (userData: User) => (dispatch: any) => {
  dispatch(setDashboardIsLoading(true));
  axios
    .patch(userEndpoints.update(), JSON.stringify(userData), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken().token}`,
      },
    })
    .then((res: any) => {
      console.log(res.data);
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'User updated',
          description: `You have successfully updated a user with username ${getToken().username}!`,
          read: false,
          priority: Priority.LOW,
          date: new Date(),
        }),
      );
      dispatch(
        setSnackbar({
          open: true,
          type: 'success',
          message: `User was updated successfully!`,
        }),
      );
      dispatch(setUser(res.data as AuthenticatedUser));
    })
    .catch((err: any) => {
      dispatch(
        setSnackbar({
          open: true,
          type: 'error',
          message: `User was not updated!`,
        }),
      );
      dispatch(
        addANotification({
          id: uuidv4(),
          title: 'User update failed',
          description: `You have failed to update a user with username ${
            getToken().username
          }! Reasons can be: invalid data or username is already taken.`,
          read: false,
          priority: Priority.HIGH,
          date: new Date(),
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setDashboardIsLoading(false));
    });
};

// #endregion
