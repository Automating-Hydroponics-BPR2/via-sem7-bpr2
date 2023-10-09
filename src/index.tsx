import React from 'react';
import ReactDOM from 'react-dom/client';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { configureAppStore } from './shared';
import './index.css';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={configureAppStore()}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
);
