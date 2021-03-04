import Commerce from "@chec/commerce.js";

// functions for the commerce.js library

export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
);

export const fetchCart = (setCart) => {
  commerce.cart
    .retrieve()
    .then((cart) => {
      setCart(cart);
    })
    .catch((error) => {
      console.error("There was an error fetching the cart", error);
    });
};

export const handleAddToCart = (item, quantity = 1, setCart) => {
  commerce.cart
    .add(item.id, quantity)
    .then((item) => {
      setCart(item.cart);
    })
    .catch((error) => {
      console.error("There was an error adding the item to the cart", error);
    });
};
export const clearCart = (setCart) => {
  commerce.cart
    .empty()
    .then((resp) => {
      setCart(resp.cart);
    })
    .catch((error) => {
      console.error("There was an error emptying the cart", error);
    });
};

export const removeItemFromCart = (id, setCart) => {
  commerce.cart
    .remove(id)
    .then((resp) => {
      setCart(resp.cart);
    })
    .catch((error) => {
      console.error(
        "There was an error removing the item from the cart",
        error
      );
    });
};

export const updateCartQty = (id, newQuantity, setCart) => {
  console.log(`updating ${id} to ${newQuantity}`);
  commerce.cart
    .update(id, { quantity: newQuantity })
    .then((resp) => {
      setCart(resp.cart);
    })
    .catch((error) => {
      console.log("There was an error updating the cart items", error);
    });
};


export const retreiveAllCategories = (setValue) => {
  commerce.categories.list().then((categories) => {
    setValue(categories.data);
    console.log(categories.data);
  });
};