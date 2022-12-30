import {ADD_TO_CART, REMOVE_FROM_CART} from '../ActionType';

const cartReducer = (initialState = [], actions: any) => {
  switch (actions.type) {
    case ADD_TO_CART:
      return [...initialState, actions.payload];
    case REMOVE_FROM_CART:
      const deleteProduct = initialState.filter((item, index) => {
        return index !== actions.payload;
      });
      return deleteProduct;
    default:
      return initialState;
  }
};

export default cartReducer;
