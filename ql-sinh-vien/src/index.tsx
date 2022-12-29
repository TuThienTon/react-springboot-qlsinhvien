import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';


ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <Provider store={store}>
            {/* <CssBaseline /> */}
            <App />
        </Provider>
      </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);
