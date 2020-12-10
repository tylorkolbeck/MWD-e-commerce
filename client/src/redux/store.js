import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './root-saga'

import rootReducer from './root-reducer'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

// Run redux logger if in development environment
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)
// persist store in localstorage
const persistor = persistStore(store)

export { store, persistor }
