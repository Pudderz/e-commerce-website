import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerce, fetchCart, handleAddToCart, updateCartQty } from "../lib/commerce";
// Shows a list of items added to the basket page

//shows total price
export const Basket = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchCart(setCart);
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const updateQty =(id, newQuantity)=>{
      updateCartQty(id, newQuantity, setCart)
  }
  return (
    <div>
      <h1>Shopping cart</h1>
      <hr />
      <ul style={{listStyle:'none',display:'grid', gap:'20px'}}>
        {cart?.line_items?.map(item => (
          <li key={item.id}>
           
            <div style={{display:'flex', justifyContent:'flex-start'}}>
                <img src={item?.media?.source} height="100"alt="" />
                <div style={{display:'grid'}}>
                 <h3 style={{margin:'0', width:'fit-content'}}>{item.name}</h3>    
<p style={{margin:'0', width:'fit-content'}}>{item.price?.formatted_with_symbol}</p>    
            <p style={{margin:'0', width:'fit-content'}}>Quantity: {item.quantity}</p>
            <div style={{width:'fit-content'}}>
               <button onClick={()=>updateQty(item.id, item.quantity+1)}>+</button>
            <button onClick={()=>updateQty(item.id, item.quantity-1)}>-</button> 
            </div>
            
                </div>
            
            
            
            </div>
            
          </li>
        ))}
      </ul>
      <hr />
      <p>
        Subtotal({cart?.total_items || 0} items): {cart?.subtotal?.formatted_with_symbol}
      </p>
      <Link to="checkout">Proceed to checkout</Link>
      
    </div>
  );
};
