import reducer from './reducers.js'
import { createStore, applyMiddleware } from 'redux'
import {homeMiddleware} from './middlewares'

export default createStore(reducer,  applyMiddleware(homeMiddleware));