import axios from 'axios';
import { RegisteredUser, User, setIsLoggedIn, setNotification, setUser, userEndpoints } from '../shared';

// #region signIn
export const signIn = (username: string, password: string) => (dispatch: any) => {
  axios
    .post(userEndpoints.signIn(), {
      Username: username,
      Password: password,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: any) => {
      dispatch(setUser(res.data as User));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `User was signed in successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `User was not signed in!`,
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setIsLoggedIn(true));
    });
};
// #endregion

// #region signUp
export const signUp = (user: RegisteredUser) => (dispatch: any) => {
  axios
    .post(userEndpoints.signUp(), {
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthYear: user.birthYear,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res: any) => {
      dispatch(setUser(res.data as User));
      dispatch(
        setNotification({
          open: true,
          type: 'success',
          message: `User was signed up successfully!`,
        }),
      );
    })
    .catch((err: any) => {
      dispatch(
        setNotification({
          open: true,
          type: 'error',
          message: `User was not signed up!`,
        }),
      );
      console.error(err);
    })
    .finally(() => {
      dispatch(setIsLoggedIn(true));
    });
};
// #endregion
