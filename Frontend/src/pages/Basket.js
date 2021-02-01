import { Button, IconButton, Tooltip } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  commerce,
  fetchCart,
  handleAddToCart,
  updateCartQty,
} from "../lib/commerce";
import { CartContext } from "../context/CartContext";
import DeleteIcon from "@material-ui/icons/Delete";

// Shows a list of items added to the basket page

//shows total price
export const Basket = () => {
  const { cart, changeCart } = useContext(CartContext);

  useEffect(() => {
    fetchCart(changeCart);
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const updateQty = (id, newQuantity) => {
    updateCartQty(id, newQuantity, changeCart);
  };
  return (
    <div>
      <h1>Shopping cart</h1>
      <hr />
      <table style={{ width: "80%", textAlign: "center",
                margin:'auto' }}>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Remove</th>
        </tr>
        {cart?.line_items?.map((item) => (
          <tr key={item.id}>
   
            <td>
              <div
              style={{
                display: "flex",
                gap:'20px',
                height: "100%",
  
              }}
              >
                <div style={{height:'200px', width:'150px', position:'relative'}}>
                   <img src={item?.media?.source} alt="" style={{position:'absolute', top:'0', bottom:'0', objectFit:'cover', left:'0', right:'0', width:'100%', height: '100%'}}/>
                </div>
                
              <h3 style={{ width: "fit-content" }}>{item.name}</h3>
              </div>
             
            </td>
            <td>
              <p>{item.price?.formatted_with_symbol}</p>
            </td>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Button onClick={() => updateQty(item.id, item.quantity + 1)}>
                  +
                </Button>
                <p>{item.quantity}</p>
                <Button onClick={() => updateQty(item.id, item.quantity - 1)}>
                  -
                </Button>
              </div>
            </td>
            <td>
              <p>{`${item.price?.raw * item.quantity}`}</p>
            </td>
            <td>
              <Tooltip title="Remove Item">
                <IconButton onClick={() => updateQty(item.id, 0)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
      </table>

      <hr />
      <p>
        Subtotal({cart?.total_items || 0} items):{" "}
        {cart?.subtotal?.formatted_with_symbol}
      </p>
      <Link to="checkout">Proceed to checkout</Link>
    </div>
  );
};
