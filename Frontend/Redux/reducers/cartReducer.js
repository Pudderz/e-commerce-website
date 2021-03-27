const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_ITEM_TO_CART":
      return { ...state, cart: [...state.cart, payload] };

    case "REMOVE_ITEM_FROM_CART": {
      let newState = { ...state };
      let i = 0;
      for (let item of newState.cart) {
        if (payload.name == item.name && payload.size == item.size) {
          newState.cart[i].splice(i, 1);
          break;
        }
        i++;
      }
      return newState;
    }
    case "REPLACE_CART":
      return { ...state, cart: payload };

    case "UPDATE_CART":
      return { ...state, cart: payload };

    case "EMPTY_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export default cartReducer;
