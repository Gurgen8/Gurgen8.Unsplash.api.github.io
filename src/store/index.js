import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import reducers from './reducers';
import watchers from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saga = createSagaMiddleWare();
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(saga)),
);

saga.run(watchers);

export default store;
