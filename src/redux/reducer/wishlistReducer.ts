import {ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST} from '../ActionType';

const wishlistReducer = (initialState = [], actions: any) => {
  switch (actions.type) {
    case ADD_TO_WISHLIST:
      return [...initialState, actions.payload];
    case REMOVE_FROM_WISHLIST:
      const deleteWishlist = initialState.filter((item, index) => {
        return index !== actions.payload;
      });
      return deleteWishlist;
    default:
      return initialState;
  }
};

export default wishlistReducer;
