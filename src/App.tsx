import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import {
  useCustomTheme,
  useGetDeviceType,
  DeviceTypes,
  setNotificationVisibility,
  Snackbar,
  AuthenticatedUser,
  setUser,
  AppDispatch,
  ApplicationState,
  TSnackbar,
  setNotification,
} from './shared';
import { Home, Error, Login, Register, Dashboard } from './pages';
import { Header, BottomNavigation } from './components';

interface AppProps {
  notification: TSnackbar;
  onInit: () => void;
  setNotificationVisibility: (visibility: boolean) => void;
}

function App(props: AppProps) {
  // Set background color for the root element
  const root = document.getElementById('root') as HTMLElement;
  const theme = useCustomTheme();
  root.style.backgroundColor = theme.palette.background.default;

  const { notification, setNotificationVisibility } = props;

  useEffect(() => {
    props.onInit();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <BrowserRouter>
          <div
            className="App"
            style={{
              backgroundColor: theme.palette.background.default,
            }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Snackbar
              open={notification.open}
              message={notification.message}
              type={notification.type}
              onClose={() => {
                setNotificationVisibility(false);
              }}
              autoHideDuration={4000}
            />
            {useGetDeviceType() !== DeviceTypes.DESKTOP && <BottomNavigation />}
          </div>
        </BrowserRouter>
      </ScThemeProvider>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  notification: state.notifications.notification,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onInit: () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token) as AuthenticatedUser;
        console.log('decoded', decoded);
        if (decoded && decoded.exp >= Date.now() / 1000) {
          // Dispatch setUser if a valid token exists
          dispatch(setUser(decoded));
          dispatch(
            setNotification({
              open: true,
              message: `Welcome back! ${decoded.username}`,
              type: 'success',
            }),
          );
        }
      }
    },
    setNotificationVisibility: (visibility: boolean) => dispatch(setNotificationVisibility(visibility)),
  };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
