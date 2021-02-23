import { Button } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import ShippingForm from "./ShippingForm";
import { CartContext } from "../../context/CartContext";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#222",
      color: "#222",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      backgroundColor: "#eee",

      ":-webkit-autofill": { color: "#222" },
      "::placeholder": { color: "#444" },
    },
    invalid: {
      iconColor: "#CF061F",
      color: "#CF061f",
    },
  },
};

export const Payment = () => {
  const { cart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();

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

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div style={{ width: "50%", minWidth: "min(400px,100%)" }}>
      <form onClick={handleSubmit}>
        <div style={{ maxWidth: "700px", margin: "auto", padding: "0 20px" }}>
          <ShippingForm
            shippingInfo={shippingInfo}
            changeShippingInfo={changeShippingInfo}
          />
          <h3>Payment Detail</h3>
          <div style={{ border: "1px solid gray", padding: "10px" }}>
            <label style={{ textAlign: "start" }}>
              <p style={{ margin: "2px 0 10px" }}>Credit/Debit card</p>
              <hr />
              <CardElement options={CARD_OPTIONS} />
            </label>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={!stripe}
              style={{
                backgroundColor: "#111",
                color: "#fff",
                padding: "5px",
                width: "100%",
                marginTop: "50px",
                borderRadius: "5px",
                fontSize: "18px",
              }}
            >
              Pay {cart?.subtotal?.formatted_with_symbol}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
