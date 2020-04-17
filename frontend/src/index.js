import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";

import './index.css';
import App from './App';
import {loadFromLocalStorage, localStorageMiddleware} from "./store/localStorage";
import * as serviceWorker from './serviceWorker';
import cocktailsReducer from "./store/reducers/cocktailsReducer";
import usersReducer from "./store/reducers/usersReducer";

import 'bootstrap/dist/css/bootstrap.min.css';

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  cocktails: cocktailsReducer,
  users: usersReducer,
});

const middleware = [
  thunkMiddleware,
  localStorageMiddleware,
  routerMiddleware(history),
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

export const store = createStore(rootReducer, persistedState, enhancers);

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
