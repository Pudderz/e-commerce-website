import { Button, CircularProgress } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext, useState, useEffect } from "react";
import ShippingForm from "./ShippingForm";
import { CartContext } from "../../context/CartContext";
import { commerce } from "../../lib/commerce";


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
  const [checkoutTokenId, setCheckoutToken] = useState();
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


  async function handleSubmit(ev) {
    ev.preventDefault();
    setProcessing(true);
    // This process includes a few API calls, so now is a good time to show a loading indicator
  
    // Create a payment method using the card element on the page
    const cardElement = elements.getElement(CardElement);
    const paymentMethodResponse = await stripe.createPaymentMethod({ type: 'card', card: cardElement});
  
    if (paymentMethodResponse.error) {
      // There was some issue with the information that the customer entered into the payment details form.
      alert(paymentMethodResponse.error.message);
      setError(`Payment failed 1 ${paymentMethodResponse.error.message}`);
      setProcessing(false);
      return;
    }
  
    try {
      // TODO: Import name from shipping form

      const order = await commerce.checkout.capture(checkoutTokenId, {
        customer: {
          firstname: 'John',
          lastname: 'Doe',
          email: 'mpudney2@gmail.com',
        },
        shipping: {
          name: 'John Doe',
          street: '123 Fake St',
          town_city: 'San Francisco',
          county_state: 'CA',
          postal_zip_code: '94103',
          country: 'US',
        },
        // Include Stripe payment method ID:
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethodResponse.paymentMethod.id,
          },
        },
      })
  console.log(order);
      // If we get here, the order has been successfully captured and the order detail is part of the `order` variable
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      return;
    } catch (response) {
      // There was an issue with capturing the order with Commerce.js
      console.log(response);
      alert(response.message);
      setError(`Payment failed 2 ${response.message}`);
      setProcessing(false);
      return;
    }
  }


  useEffect(() => {
    commerce.checkout.generateTokenFrom('cart', commerce.cart.id())
    .then(response => setCheckoutToken(response.id));
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
      <form onSubmit={handleOrder}>
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
