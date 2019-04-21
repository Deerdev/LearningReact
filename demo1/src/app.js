import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import { BrowserRouter } from 'react-router-dom';

// import { configureStore } from './store';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducer'

import AppCommon from './appCommon';

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

const AppContainer = () => (
  <BrowserRouter>
    <AppCommon />
  </BrowserRouter>
);

const HotApp = hot(module)(AppContainer);

const App = () => (
  <Provider store={store}>
    <HotApp />
  </Provider>
);

export default App;