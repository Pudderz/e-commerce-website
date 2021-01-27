import React, { useState, useEffect } from "react";
import { Cart } from "../components/Cart";
import { commerce } from "../lib/commerce";
import {
  Link
} from "react-router-dom";
import { RecentlyViewed } from "../components/RecentlyViewed";
import Skeleton from '@material-ui/lab/Skeleton';
export const StorePage = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = () => {
    commerce.products
      .list()
      .then((item) => {
        setProducts((items) => item.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        setCart(cart );
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
  };

  const handleAddToCart= (item, quantity=1)=> {
    commerce.cart.add(item.id, quantity).then((item) => {
      setCart(item.cart)
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  };
  const clearCart =()=>{
    commerce.cart.empty().then((resp) => {
      setCart(resp.cart)
    }).catch((error) => {
      console.error('There was an error emptying the cart', error);
    });
  };

  const removeItemFromCart = (id) => {
    commerce.cart.remove(id).then((resp) => {
      setCart(resp.cart)
    }).catch((error) => {
      console.error('There was an error removing the item from the cart', error);
    });
  }

  const updateCartQty = (id, newQuantity) => {
    console.log(`updating ${id} to ${newQuantity}`)
    commerce.cart.update(id, { quantity: newQuantity }).then((resp) => {
      setCart(resp.cart)
    }).catch((error) => {
      console.log('There was an error updating the cart items', error);
    });
  }


  useEffect(() => {
    fetchProducts();
    fetchCart();

    return () => {};
  }, []);

  useEffect(() => {
    console.log(products);
    return () => {};
  }, [products]);
  return (
    <div>
      <h1>Test</h1>
     <p>Shopping Cart - {cart.total_items} </p>
     <button onClick={clearCart}>Clear Cart</button>
      <ul
        style={{
          display: "flex",
          flexFlow: "wrap",
          listStyle: "none",
          gap: "20px",
          margin: "auto",
        }}
      >
        {products.map((item, index) => (
          <li key={index} style={{ width: "20%", boxSizing: "border-box" }}>
            <h4>{item.name}</h4>
            <img src={item.media.source} alt={item.name} height="300" />
            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
            <p>{item.price.formatted_with_symbol}</p>
            <Link to={{
              pathname: "/product",
              search: `?id=${item.id}`,
            }}>Details</Link>
            <p></p>
            <a href={item.checkout_url.checkout}>Buy Now</a>
            <button onClick={()=>handleAddToCart(item)}>Add To Basket</button>
            {/* <a href={item.checkout_url.checkout}>Add to Basket</a> */}
          </li>
        ))}
      </ul>
          {/* {JSON.stringify(cart)} */}
          <Cart
          cart={cart}
          updateCartQty={updateCartQty}
          emptyCart={clearCart}
          removeItemFromCart={removeItemFromCart}
          />
          <RecentlyViewed/>
    </div>
  );
};
