import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';    // gets the local storage object

import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'

// JSON object that represents the possible objects we want to store
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,    // handled by firebase, so we dont need to persist it
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);