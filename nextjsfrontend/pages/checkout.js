import { Breadcrumbs, Button, Typography } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import ShippingForm from "../components/Checkout/ShippingForm";
import { CartContext } from "../context/CartContext";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Payment } from "../components/Checkout/Payment";

const promise = loadStripe(
  "pk_test_51ICSvvEduQoHI0PkPXFpVekvFm9fDb84KUYGy9CGtFlm1b6ZzjZ1Z9mVWaBEPIFvo3uQInuowX2KcEAbBANuqzeV00N77MhPiW"
);

export const Checkout = () => {
  const { cart } = useContext(CartContext);

  const [shippingInfo, setShippingInfo] = useState({});
  // const [userInfo, , setUserInfo] = useState({
  //   firstname: "",
  //   lastname: "",
  //   customerEmail: "",
  // });

  const changeShippingInfo = (target, value) => {
    setShippingInfo({
      ...shippingInfo,
      [target]: value,
    });
  };

  return (
    <>
      <div style={{ margin: "30px 0 0  20px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/basket">Cart</Link>
          <Typography>Checkout</Typography>
        </Breadcrumbs>
      </div>

      <div
        style={{
          // maxWidth: "800px",
          margin: "30px auto",
          // backgroundColor: "#ddd",
          padding: "15px",
          borderRadius: "30px",
          display: "flex",
          flexFlow: "wrap",
        }}
      >
        <Elements stripe={promise}>
          <Payment />
        </Elements>

        <div
          style={{
            width: "40%",
            minWidth: "min(400px,100%)",
            margin: "0 auto",
            position: "sticky",
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
            {cart?.line_items?.length === 0 ? (
              <div>
                <h3>Your Basket is empty</h3>
                <p>
                  Continue shopping on the <a href="/">homepage</a>, browse our
                  discounts, or visit your Wish List
                </p>
              </div>
            ) : (
              <div>
                {cart?.line_items?.map((item) => (
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
                        <Link href={`/product/${item.permalink}`}>
                          <img
                            src={item?.media?.source}
                            width="100"
                            alt=""
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
                          Size: UK {item?.variants?.[0]?.option_name}
                        </p>
                        <p
                          style={{
                            margin: "0",
                            width: "fit-content",
                          }}
                        >
                          {item.price?.formatted_with_symbol}
                        </p>

                        <p
                          style={{
                            margin: "0",
                            width: "fit-content",
                          }}
                        >
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    {/* <hr style={{margin:'0 0 5px'}}/> */}
                  </li>
                ))}
              </div>
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
              // backgroundColor: "#111",
              // color: "#fff",
              padding: "5px",
              borderRadius: "5px",
              fontSize: "20px",
            }}
          >
            <p style={{ margin: "5px" }}>
              Subtotal({cart?.total_items || 0} item
              {cart?.total_items > 1 && "s"}
              ): {cart?.subtotal?.formatted_with_symbol}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
