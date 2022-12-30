import {combineReducers, createStore} from 'redux';
import wishlistReducer from '../reducer/wishlistReducer';
import cartReducer from '../reducer/cartReducer';
import addressReducer from '../reducer/addressReducer';

const routeReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  address: addressReducer,
});
const store = createStore(routeReducer);
export default store;

// @ts-ignore
export type RootState = ReturnType<typeof store>;
