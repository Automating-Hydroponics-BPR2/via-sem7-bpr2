import React from 'react';
import ReactDOM from 'react-dom/client';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { AppContainer } from './app';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureAppStore } from './shared';
import './index.css';
Amplify.configure(awsExports);
const store = configureAppStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <AppContainer />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
);
