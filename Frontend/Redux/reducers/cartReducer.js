const initialState = {
  cart: []
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_ITEM_TO_CART":
      return { ...state, targetProjectNumber: payload };

    case "REMOVE_ITEM_TO_CART":
      return { ...state, projectInViewNumber: payload };

    case "REPLACE_CART":
      return { ...state, fastTravelMode: payload };

    case "UPDATE_CART":
      return { ...state, fastTravelMode: payload };
    
      case "EMPTY_CART":
        return { ...state, cart: [] };
      

    default:
      return state;
  }
};

export default cartReducer;
