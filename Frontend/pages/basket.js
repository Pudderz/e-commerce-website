import { Button, IconButton, Tooltip } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "next/link";
import {addCartItem, removeCartItem} from "../Redux/actions/actions"
import { connect } from 'react-redux'

// Shows a list of items added to the basket page

//shows total price
export const Basket = (props) => {
  console.log(props)

  const {cart: stateCart =[]} = props.state.cart;
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  console.log(stateCart)
console.log(`stateCart ${typeof stateCart}`)
  useEffect(() => {
    console.log(stateCart)
    return () => {
      
    }
  }, [stateCart])


  const [isSmallDisplay, setIsSmallDisplay] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 700) {
      setIsSmallDisplay(true);
    } else {
      setIsSmallDisplay(false);
    }
    window.addEventListener("resize", (e) => {
      if (window.innerWidth < 700 && isSmallDisplay === false) {
        setIsSmallDisplay(true);
      } else if (window.innerWidth >= 1000 && isSmallDisplay === true) {
        setIsSmallDisplay(false);
      }
    });
    return () => {
      window.removeEventListener("resize", (e) => {
        if (window.innerWidth < 700 && isSmallDisplay === false) {
          setIsSmallDisplay(true);
        } else if (window.innerWidth >= 700 && isSmallDisplay === true) {
          setIsSmallDisplay(false);
        }
      });
    };
  }, []);


 
 
  const updateItemQty = (id, newQuantity) => {
    updateQty(id, newQuantity);
  };

  const removeItem = (id)=> removeFromCart(id);


  useEffect(() => {
    console.log(cart);
  }, [cart]);

 
  return (
    <div>
      <h1>Shopping cart</h1>
      <hr />
      {JSON.stringify(stateCart)}
      {isSmallDisplay ?
      (
        <div style={{ padding: "10px" }}>
        
        <ul
          style={{
            listStyle: "none",
            display: "grid",
            gap: "50px",
            padding: "0",
            maxWidth: "100%",
          }}
        >
          {stateCart?.length === 0 ? (
            <div>
              <h3>Your Basket is empty</h3>
              <p>
                Continue shopping on the{" "}
                <Link href="/">homepage</Link>, browse our discounts,
                or visit your Wish List
              </p>
            </div>
          ) : (
            <div>
              {[...stateCart]?.map((item) => (
                <li key={item.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "blue",
                        height: "100px",
                        width: "100px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Link
                        href={`/product/${item.permalink}`}
                       
                      >
                        <img
                          src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item?.images[0]}`}
                          width="100"
                          alt={item.name}
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            bottom: "0",
                            objectFit: "cover",
                            right: "0",
                          }}
                        />
                      </Link>
                    </div>

                    <div style={{ display: "grid" }}>
                      <h3
                        style={{
                          margin: "0",
                          width: "fit-content",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          margin: "0",
                          width: "fit-content",
                        }}
                      >
                       UK {item?.size} {item?.price}
                      </p>
                      <p
                        style={{
                          margin: "0",
                          width: "fit-content",
                        }}
                      >
                        Quantity: {item.quantity}
                      </p>
                      <div style={{ width: "fit-content" }}>
                        <Tooltip title="Add 1">
                          <Button
                            onClick={() =>
                              updateItemQty(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </Tooltip>
                        <Tooltip title="Remove 1">
                          <Button
                            onClick={() =>
                              updateItemQty(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          
                        </Tooltip>
                        <Tooltip title="Remove Item">
                          <IconButton
                            onClick={() => removeItem(item.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  {/* <hr style={{margin:'0 0 5px'}}/> */}
                </li>
              ))}
            </div>
          )}
        </ul>

      </div>
      ):(
<table
        style={{
          width: "100%",
          maxWidth: "1100px",
          textAlign: "center",
          margin: "auto",
          overflow:'auto'
        }}
      >
        <thead> 
        <tr>
          <th className="tableHeader">Item</th>
          <th className="tableHeader">Price</th>
          <th className="tableHeader">Quantity</th>
          <th className="tableHeader">Total Price</th>
          <th className="tableHeader">Remove</th>
        </tr>
        </thead> 
        <tbody>

       
        {[...stateCart]?.map((item) => (
          <tr key={item.id}>
            <td>
              <div
              className="shoppingCartItem"
               
              >
                <div
                  style={{
                    height: "200px",
                    maxWidth: "150px",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item?.images[0]}`}
                    alt=""
               
                  />
                </div>
                <div>
                  <h3
                    style={{
                      width: "fit-content",
                      margin: "0",
                      fontSize: "clamp(14px, 2vw, 20px)",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p style={{ textAlign: "start" }}>
                    Size: {item?.size}
                  </p>
                </div>
              </div>
            </td>
            <td>
              <p>{item.price}</p>
            </td>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Button
                size="small"
                  onClick={() => updateItemQty(item.id, item.quantity + 1)}
                  style={{ padding: "0", width:'5px', minWidth:'20px', margin:'auto' }}
                >
                  +
                </Button>
                <p>{item.quantity}</p>
                <Button
                  onClick={() => updateItemQty(item.id, item.quantity - 1)}
                  style={{ padding: "0", width:'5px', minWidth:'20px', margin:'auto' }}
                >
                  -
                </Button>
              </div>
            </td>
            <td>
              <p>{`£${((item.price?.raw * 100 * item.quantity) / 100).toFixed(
                2
              )}`}</p>
            </td>
            <td>
              <Tooltip title="Remove Item">
                <IconButton onClick={() => updateItemQty(item.id, 0)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      
      )}
      
      <div
        style={{
          position: "sticky",
          bottom: "0px",
          boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.4)",
          zIndex: "3",
          backgroundColor: "#fff",
          padding: "0 0 20px",
        }}
      >
        <hr />
        <p>
          Subtotal({cart?.total_items || 0} items):{" "}
          {cart?.subtotal?.formatted_with_symbol}
        </p>
        <Link href="/checkout">Proceed to checkout</Link>
      </div>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
  state:{...state},
  props:{...ownProps},
})

const mapDispatchToProps = {
  addCartItem,
  removeCartItem,
  // ... normally is an object full of action creators
}



export default connect(mapStateToProps, mapDispatchToProps)(Basket)
// export default Basket;