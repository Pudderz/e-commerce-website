import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Payment } from "../components/Checkout/Payment";
import {
  addCartItem,
  removeCartItem,
  emptyCart,
  addCartItemQuantity,
} from "../Redux/actions/actions";
import { connect } from "react-redux";
import Image from "next/image";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_API_KEY);

export const Checkout = (props) => {
  const { cart: stateCart, cartInfo } = props;
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);

  const verifyCart = () => {
    if (stateCart.length > 0) {
      let cart = JSON.stringify(stateCart);
      fetch(`${process.env.BACKEND_SERVER}/verifyCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: cart,
      })
        .then((response) => response.json())
        .then((data) => {
          setItems([...data.confirmedItems]);
          setPrice(data.amount);
        });
    }
  };

  useEffect(() => {
    verifyCart();
  }, []);

  const handleChangeItems = ({ amount, items }) => {
    setItems(data.confirmedItems);
    setPrice(data.amount);
  };

  const handleEmptyCart = (cart)=>{
    props.emptyCart();
  }

  return (
    <>
      <div style={{ margin: "30px 0 0  20px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/basket">Cart</Link>
          <Typography>Checkout</Typography>
        </Breadcrumbs>
      </div>

      <div className="checkoutContainer">
        <Elements stripe={promise}>
          <Payment
            cartInfo={stateCart}
            items={items}
            price={price}
            changeItems={handleChangeItems}
            emptyCart={handleEmptyCart}
          />
        </Elements>

        <div
          style={{
            width: "40%",
            minWidth: "min(400px,100%)",
            margin: "0 auto",
            // position: "sticky",
            top: "70px",
            height: "fit-content",
            overflow: "auto",
          }}
        >
          <h3 style={{ textAlign: "start" }}>Your Order</h3>
          <hr />
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
                  Continue shopping on the <a href="/">homepage</a> and browse
                  our discounts.
                </p>
              </div>
            ) : (
              <>
                {items.length == 0 && (
                  <div>
                    <p>Failed to verify cart</p>
                    <Button onClick={verifyCart}>Try Again</Button>
                  </div>
                )}
                <ul style={{ padding: "0" }}>
                  {items?.map((item) => (
                    <li key={`${item.id}${item.size}`}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "20px",
                        }}
                      >
                        <Link href={`/product/${item.slug}`}>
                          <a>
                            <Image
                              src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item?.images[0]}`}
                              width={100}
                              height={100}
                              alt={item.name}
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                        </Link>

                        <div className="checkoutItemInfo">
                          <h3>{item.name}</h3>
                          <p>Size: UK {item?.size}</p>
                          <p>£{(price / 100).toFixed(2)}</p>

                          <p>Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </ul>
          <hr />
          <div
            className="inputContainer"
            style={{ display: "flex", width: "100%", gap: "20px" }}
          >
            <label style={{ width: "80%" }}>
              <input
                placeholder="Discount Code"
                style={{
                  boxSizing: "border-box",
                  fontSize: "20px",
                  height: "100%",
                }}
              />
            </label>
            <Button variant="contained" style={{ width: "20%" }}>
              Apply
            </Button>
          </div>

          <div
            style={{
              padding: "5px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <p style={{ margin: "5px" }}>
              Subtotal({items.length || 0} item
              {items.length > 1 && "s"}
              ): £{(price / 100).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
  cart: state.cart.cart,
  cartInfo: state.cart.cartInfo,
  props: { ...ownProps },
});

const mapDispatchToProps = {
  addCartItem,
  removeCartItem,
  addCartItemQuantity,
  emptyCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
