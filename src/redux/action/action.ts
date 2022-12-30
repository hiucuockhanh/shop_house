import {
  ADD_ADDRESS,
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  REMOVE_ADDRESS,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
} from '../ActionType';

export const addItemToCart = (data: Product) => ({
  type: ADD_TO_CART,
  payload: data,
});
export const removeFromCart = (index: number) => ({
  type: REMOVE_FROM_CART,
  payload: index,
});
export const addItemToWishlist = (data: Product) => ({
  type: ADD_TO_WISHLIST,
  payload: data,
});
export const removeFromWishlist = (index: number) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: index,
});
export const addAddress = (data: Address) => ({
  type: ADD_ADDRESS,
  payload: data,
});
export const removeAddress = (index: number) => ({
  type: REMOVE_ADDRESS,
  payload: index,
});
