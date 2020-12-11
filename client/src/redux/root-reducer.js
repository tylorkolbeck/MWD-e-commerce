import { combineReducers } from 'redux'
import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'
import siteData from './__site-meta-data/site.reducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // tell redux persist to use localstorage for the storage

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] // what part of the reducer we want to persist
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  _siteData: siteData
})

export default persistReducer(persistConfig, rootReducer)
