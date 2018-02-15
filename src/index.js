import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducers';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8bf6ff',
      main: '#4fc3f7',
      dark: '#0093c4',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff8a50',
      main: '#ff5722',
      dark: '#c41c00',
      contrastText: '#fff',
    },
  },
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//
// const store = createStore(
//   reducer,
//   composeEnhancers(
//     applyMiddleware(logger)
//   )
// )

function AppTheme() {
  return (
    // <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    // </Provider>
  );
}

ReactDOM.render(<AppTheme />, document.getElementById('root'));
registerServiceWorker();
