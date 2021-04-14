const initialState = {
  cartInfo: {
    totalItems: 0,
    totalPrice: 0,
  },
  cart: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_ITEM_TO_CART":{

      //loop through cart and check if item is already in cart
      let newState = { ...state };
      if(payload.quantity < 0 )return newState;
      
      for (let item of newState.cart) {
        if (payload.name == item.name && payload.size == item.size) {

          if(payload.quantity+ item.quantity > 1*item.maxStock) return newState;
          // If new quantity is 0, remove item
          item.quantity += payload.quantity;
          newState.cartInfo.totalItems += payload.quantity;
          newState.cartInfo.totalPrice += payload.quantity * item.price;
          return newState;
        }
      }
      
      newState.cartInfo.totalItems += payload.quantity;
       newState.cartInfo.totalPrice += payload.quantity * payload.price;

      return { ...newState, cart: [...newState.cart, payload] };
    }
      

    case "REMOVE_ITEM_FROM_CART": {
      let newState = { ...state };
      let i = 0;
      console.log(newState)
      
      for (let item of newState.cart) {
        if (payload.name == item.name && payload.size == item.size) {

          newState.cartInfo.totalItems -= item.quantity;
          newState.cartInfo.totalPrice -= item.quantity * item.price;
          newState.cart.splice(i, 1);

          break;
        }
        i++;
      }
      return newState;
    }

    case "UPDATE_ITEM_QUANTITY_IN_CART":{
      let newState = { ...state };
      let i = 0;
      if(payload.quantity < 0 )return newState;
      
      for (let item of newState.cart) {
        if (payload.name == item.name && payload.size == item.size) {
          // If new quantity is 0, remove item
          if(payload.quantity === 0){
            newState.cartInfo.totalItems -= item.quantity;
            newState.cartInfo.totalPrice -= item.quantity * item.price;
            newState.cart.splice(i, 1);


          }else if(payload.quantity > 1*item.maxStock ){
            return newState;
          }else{
            newState.cartInfo.totalItems -= item.quantity;
            newState.cartInfo.totalPrice -= item.quantity * item.price;
            newState.cartInfo.totalItems += payload.quantity;
            newState.cartInfo.totalPrice += payload.quantity * item.price;
            item.quantity= payload.quantity;


          }
          break;
        }
        i++;
      }
      return newState;
    }
    case "REPLACE_CART":
      return { ...state, cart: payload.cart, cartInfo: payload.cartInfo };

    case "UPDATE_CART":
      return { ...state, cart: payload, cart: payload.cart, cartInfo: payload.cartInfo };

    case "EMPTY_CART":
      return { ...state, ...initialState};

    default:
      return state;
  }
};

export default cartReducer;
