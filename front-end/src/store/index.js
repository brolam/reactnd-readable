import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import {appMiddleware} from './middlewares'

export default createStore(reducer,  applyMiddleware(appMiddleware));