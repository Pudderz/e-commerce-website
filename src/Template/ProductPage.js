import React, {useEffect, useState} from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ProductImages } from "../components/ProductImages";
import { RecentlyViewed } from "../components/RecentlyViewed";
import { commerce } from "../lib/commerce";
import { addToHistory } from "../lib/localStorage";
export const ProductPage = () => {
  const [product, setProduct]= useState({})
  const [cart, setCart] = useState({})  

  
  const fetchItem =(id)=>{
      commerce.products
        .retrieve(id)
        .then((cart) => {
          setProduct(cart);
          
        })
        .catch((error) => {
          console.error("There was an error fetching the cart", error);
        });
  }

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

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get('id');
    fetchItem(id);
  }, [])

  useEffect(() => {
    console.log(product);
  }, [product])


  useEffect(() => {
    fetchCart();

    return ()=>{
      addToHistory(product);
    }
  }, [product]);

  const handleAddToCart= (item, quantity=1)=> {
    commerce.cart.add(item.id, quantity).then((item) => {
      setCart(item.cart)
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  };


  return (
    <>
      <p>BreadCrumb</p>
<button>Back</button>
      <div style={{display:'flex', margin:'auto', width:'fit-content'}}>
        <div>
          {/* Product Images */}
          <ProductImages
          images = {product.assets}
          />
        </div>
        <div>
        <div>
          <h1>{product.name}</h1>
          {/* +Review bar */}
          <h2>{product?.price?.formatted_with_symbol}</h2>
          <p>Number of Stock left - {product.quantity}</p>
          <p>Description - With read more button</p>
        <p>Available sizes:</p>
        <p>Colours Available:</p>
          {/* Available sizes section */}
          <input type="text" />
          <button onClick={()=>handleAddToCart(product, 1)}>ADD TO BASKET</button>
          <button>BUY NOW</button>
        </div>
      

      {/* tabbed sections with information  */}
      
        </div>
    
      </div>
<div style={{margin:'auto', width:'fit-content'}}>
        <div>{/* Buttons for tab at top */}</div>
        <div style={{display:'flex'}}>
          <button>descriptions</button>
          <button>Reviews</button>
          <button>Size Guide</button>
          <button>Delivery & Returns</button>
        </div>
        <div>
          <div>descriptions</div>
          <div>Reviews</div>
          <div>Size Guide</div>
          <div>Delivery & Returns</div>
        </div>
      </div>
      <RecentlyViewed/>
    </>
  );
};
