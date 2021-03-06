import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import { createLogger } from 'redux-logger'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8bf6ff',
      main: '#0093c4',
      dark: '#0093c4',
      contrastText: '#fff',
    },
    divider: '#0093c4',
    secondary: {
      light: '#ff8a50',
      main: '#ff5722',
      dark: '#c41c00',
      contrastText: '#fff',
    },
  },
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, loadingBarMiddleware())));

function AppTheme() {
  return (
     <Provider store={store}>
       <MuiThemeProvider theme={theme}>
         <BrowserRouter>
           <App />
         </BrowserRouter>
       </MuiThemeProvider>
     </Provider>
  );
}

ReactDOM.render(<AppTheme />, document.getElementById('root'));
registerServiceWorker();
