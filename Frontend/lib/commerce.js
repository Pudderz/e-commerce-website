import Commerce from "@chec/commerce.js";

// functions for the commerce.js library

export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
);

export const fetchItem = (id, setProduct)=>{
  commerce.products
      .retrieve(id)
      .then((product) => {
        console.log(product);
        setProduct(product);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
}


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

export const handleAddVariantToCart = (item, quantity = 1, sizeIdValue, variantId, enqueueSnackbar ,setCart)=>{
    if(typeof variantId !=="undefined"){
      commerce.cart
      .add(item.id, quantity,{[sizeIdValue]: variantId})
      .then((item) => {
        setCart(item.cart);
        enqueueSnackbar("Item added to the basket", { variant: "success" });
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
        enqueueSnackbar("Item could not be added to the basket", {
          variant: "error",
        });
      });
    }else{
      
        enqueueSnackbar("An error occured, please try again later.", {
          variant: "error",
        });
      
      
    }
    


}

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

export const updateCartQty = (id, newQuantity, setCart, variantId, optionId) => {
  console.log(`updating ${id} to ${newQuantity}`);
  commerce.cart
    .update(id, { quantity: newQuantity, [variantId]: optionId })
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