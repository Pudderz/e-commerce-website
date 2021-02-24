import { Button, CircularProgress } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext, useState, useEffect } from "react";
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
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const { cart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [shippingInfo, setShippingInfo] = useState({});


  const changeShippingInfo = (target, value) => {
    setShippingInfo({
      ...shippingInfo,
      [target]: value,
    });
  };


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('received')
        setClientSecret(data.clientSecret);
      });
  }, []);


  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };



  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <div style={{ width: "50%", minWidth: "min(400px,100%)" }}>
      <form onSubmit={handleSubmit}>
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
              <CardElement options={CARD_OPTIONS} onChange={handleChange} />
            </label>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={processing || disabled || succeeded}
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
              
              <span id="button-text">
          {processing ? (
            <CircularProgress size={24}/>
            
          ) : (
            `Pay ${cart?.subtotal?.formatted_with_symbol}`
          )}
        </span>
            </Button>

            {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}

<p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
          </div>
        </div>
      </form>
    </div>
  );
};
