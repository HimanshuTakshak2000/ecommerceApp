import { combineReducers } from '@reduxjs/toolkit';

import AllProductSlice from './HomeScreenReducer';
import CartReducer from './AddToCartScreenReducer'

const rootReducer = combineReducers({
  getAllProduct: AllProductSlice,
  cart: CartReducer,

});
export default rootReducer;
