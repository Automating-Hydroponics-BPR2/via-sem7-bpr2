import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { AuthenticatedUser, User, setIsLoading, setNotification, setUser, userEndpoints } from '../shared';

// #region signIn
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
      console.log(res.data);
      localStorage.setItem('token', res.data as string);
      dispatch(setUser(jwtDecode(res.data as string) as AuthenticatedUser));
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
      dispatch(setIsLoading(false));
    });
};

// #endregion

// #region signUp
export const register = (user: User) => (dispatch: any) => {
  dispatch(setIsLoading(true));
  axios
    .post(userEndpoints.register(), JSON.stringify(user))
    .then((res: any) => {
      console.log(res.data);
      localStorage.setItem('token', res.data as string);
      dispatch(setUser(jwtDecode(res.data as string) as AuthenticatedUser));
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
      dispatch(setIsLoading(false));
    });
};
// #endregion
