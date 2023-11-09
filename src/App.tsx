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
  setSnackbarVisibility,
  Snackbar,
  AuthenticatedUser,
  setUser,
  AppDispatch,
  ApplicationState,
  TSnackbar,
  setSnackbar,
} from './shared';
import { Home, Error, Login, Register, Dashboard } from './pages';
import { Header, BottomNavigation } from './components';

interface IAppProps {
  snackbar: TSnackbar;
  user?: AuthenticatedUser;

  onInit: () => void;
  setSnackbarVisibility: (visibility: boolean) => void;
}

const App = (props: IAppProps) => {
  // Set background color for the root element
  const root = document.getElementById('root') as HTMLElement;
  const theme = useCustomTheme();
  root.style.backgroundColor = theme.palette.background.default;

  const { snackbar, setSnackbarVisibility } = props;

  useEffect(() => {
    if (!props.user) {
      props.onInit();
    }
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
              {props.user ? (
                <Route path="/dashboard" element={<Dashboard />} />
              ) : (
                <Route path="/dashboard" element={<Login />} />
              )}
              <Route path="*" element={<Error />} />
            </Routes>
            <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              type={snackbar.type}
              onClose={() => {
                setSnackbarVisibility(false);
              }}
              autoHideDuration={4000}
            />
            {useGetDeviceType() !== DeviceTypes.DESKTOP && <BottomNavigation />}
          </div>
        </BrowserRouter>
      </ScThemeProvider>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  snackbar: state.notifications.snackbar,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onInit: () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token) as AuthenticatedUser;
        if (decoded && decoded.exp >= Date.now() / 1000) {
          // Dispatch setUser if a valid token exists
          dispatch(setUser(decoded));
          dispatch(
            setSnackbar({
              open: true,
              message: `Welcome back! ${decoded.username}`,
              type: 'success',
            }),
          );
        }
      }
    },
    setSnackbarVisibility: (visibility: boolean) => dispatch(setSnackbarVisibility(visibility)),
  };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
