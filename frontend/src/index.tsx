import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { store } from './store/index';
import { ThemeProvider } from './theme/ThemeContext';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);