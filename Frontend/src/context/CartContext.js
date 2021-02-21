import React, { useEffect, useState } from "react";
import {
  clearCart,
  fetchCart,
  handleAddToCart,
  removeItemFromCart,
  updateCartQty,
} from "../lib/commerce";

import { useAuth0 } from "@auth0/auth0-react";
export const CartContext = React.createContext();

export const CartContextProvider = (props) => {
  const { getAccessTokenSilently } = useAuth0();

  const [cart, setCart] = useState({});
  useEffect(()=>{
    (async () => {
    fetchCart(setCart);
    try {
      const token = await getAccessTokenSilently();
      console.log(token, getAccessTokenSilently());
      if (token) {
        localStorage.setItem("token", token);
      }
    } catch (err) {
      console.log(err);
    }
  })();
  }, []);

  const addToCart = (item, quantity) => {
    handleAddToCart(item, quantity, setCart);
  };

  const removeItem = (itemId) => {
    removeItemFromCart(itemId, setCart);
  };

  const handleNewItemQuantity = (id, newQty) => {
    updateCartQty(id, newQty, setCart);
  };
  return (
    <CartContext.Provider
      value={{
        changeCart: (value) => setCart(value),
        cart,
        addToCart: (item, quantity) => addToCart(item, quantity),
        removeFromCart: (itemId) => removeItem(itemId),
        clearCart: () => clearCart(setCart),
        updateQty: (itemId, newQty) => handleNewItemQuantity(itemId, newQty),
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
