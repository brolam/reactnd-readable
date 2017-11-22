import reducer from './reducers'
import { createStore, applyMiddleware , compose } from 'redux'
import { appMiddleware } from './middlewares'
import { createLogger } from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  // ...options
});

export default createStore(reducer,  composeEnhancers(applyMiddleware(appMiddleware, logger)));