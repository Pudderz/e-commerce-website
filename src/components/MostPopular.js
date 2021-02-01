import React, { useState, useEffect, useContext} from "react";
import { Cart } from "../components/Cart";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
import { RecentlyViewed } from "../components/RecentlyViewed";
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, Typography } from "@material-ui/core";
import { CartContext} from '../context/CartContext';
import hikingBackground from '../images/hikingBackground.jpg'

export const MostPopular = (props) => {
  const [products, setProducts] = useState(Array.from({length: 4}, ()=>0));
 
  const {cart, changeCart} = useContext(CartContext)

  
  const fetchProducts = () => {
    commerce.products
      .list({limit: 4})
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
        changeCart(cart);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
  };

  const handleAddToCart = (item, quantity = 1) => {
    commerce.cart
      .add(item.id, quantity)
      .then((item) => {
        changeCart(item.cart);
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
  };


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
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <h3 style={{textAlign:'start', marginLeft:'20px'}}>Most Popular</h3>
      <Button>{">"}</Button>
    </div>
      
      <hr/>
      <ul
        style={{
          display: "flex",
          flexFlow: "wrap",
          listStyle: "none",
          gap: "20px",
          margin: "auto",
          padding:'0',
          justifyContent:'center'
        }}
      >
        
        

        {products.map((item, index) => (
        <>
        {typeof item !== 'object'?(
          <li style={{ width: "20%", boxSizing: "border-box" }}>
          <Typography variant="h4">
            <Skeleton style={{ margin: "11px auto" }} />
          </Typography>
          <Skeleton
            variant="rect"
            height={300}
            width={225}
            style={{ margin: "0px auto" }}
          ></Skeleton>
          

          <Skeleton height={25} style={{ margin: "20px auto 0" }}></Skeleton>
          <Skeleton height={25} style={{ margin: "10px auto 0" }}></Skeleton>
        </li>
        ) : (
            <li key={index} style={{ width: "24%", boxSizing: "border-box" }}>
            <h4>{item.name}</h4>
            <Link
              to={{
                pathname: "/product",
                search: `?id=${item.id}`,
              }}
            >
            <img src={item.media.source} alt={item.name}  style={{maxWidth:'100%', maxHeight:'300px'}} />
            </Link>
           
            <p>{item.price.formatted_with_symbol}</p>
            <a href={item.checkout_url.checkout}>Buy Now</a>
            <button onClick={() => handleAddToCart(item)}>Add To Basket</button>

          </li>
        )}
          
          </>
        ))}
      </ul>
      <hr/>
    </div>
  );
};
