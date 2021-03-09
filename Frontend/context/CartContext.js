import React, { useEffect, useState } from "react";
import {
  clearCart,
  fetchCart,
  handleAddToCart,
  handleAddVariantToCart,
  removeItemFromCart,
  updateCartQty,
} from "../lib/commerce";

export const CartContext = React.createContext();

export const CartContextProvider = (props) => {
  

  const [cart, setCart] = useState({});
  useEffect(()=>{
    (async () => {
    fetchCart(setCart);
    
  })();
  }, []);

  const addToCart = (item, quantity) => {
    
    handleAddToCart(item, quantity, setCart);
  };
const addVariantItemToCart = (item, quantity, sizeIdValue, optionId, enqueueSnackbar) =>{
  handleAddVariantToCart(item, quantity, sizeIdValue, optionId,enqueueSnackbar, setCart );
}
  const removeItem = (itemId) => {
    removeItemFromCart(itemId, setCart);
  };

  const handleNewItemQuantity = (id, newQty, variantId, optionId) => {
    updateCartQty(id, newQty, setCart, variantId, optionId);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart])
  return (
    <CartContext.Provider
      value={{
        changeCart: (value) => setCart(value),
        cart,
        addToCart: (item, quantity) => addToCart(item, quantity),
        removeFromCart: (itemId) => removeItem(itemId),
        clearCart: () => clearCart(setCart),
        updateQty: (itemId, newQty, variantId, optionId) => handleNewItemQuantity(itemId, newQty, variantId, optionId),
        addVariantItemToCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
