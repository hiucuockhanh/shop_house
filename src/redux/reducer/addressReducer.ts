import {ADD_ADDRESS, REMOVE_ADDRESS} from '../ActionType';

const addressReducer = (initialState = [], actions: any) => {
  switch (actions.type) {
    case ADD_ADDRESS:
      return [...initialState, actions.payload];
    case REMOVE_ADDRESS:
      const deleteAddress = initialState.filter((item, index) => {
        return index !== actions.payload;
      });
      return deleteAddress;
    default:
      return initialState;
  }
};

export default addressReducer;
