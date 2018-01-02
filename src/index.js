import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import 'normalize.css';
import './fonts.css';
import './index.css';
import { getLocalWeather } from './actions/weather';
import { getPlace } from './actions/place';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import './i18n';

import App from './containers/App';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
store.dispatch(getPlace());
store.dispatch(getLocalWeather());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
