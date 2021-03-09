import { Button, CircularProgress, Modal } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext, useState, useEffect } from "react";
import ShippingForm from "./ShippingForm";
import { CartContext } from "../../context/CartContext";
import { commerce } from "../../lib/commerce";
import { AvailableCountries } from "./AvailableCountries";
import { useRouter } from 'next/router'
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

const EXAMPLE_INFO = {
  customer: {
    firstname: "John",
    lastname: "Doe",
    email: "mpudney2@gmail.com",
  },
  shipping: {
    name: "John Doe",
    street: "123 Fake St",
    town_city: "San Francisco",
    county_state: "CA",
    postal_zip_code: "94103",
    country: "US",
  },
};

export const Payment = () => {
  const router = useRouter();
  const [checkoutTokenId, setCheckoutToken] = useState();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { cart,changeCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    deliveryCountry: "",
    town_city: "",
    street: "",
    street2: "",
    deliveryRegion: "",
    postal_zip_code: "",
    phoneNumber: "",
    email: "",
    orderNotes: "",
  });

  const importDemoShippingInfo = () => {
    setShippingInfo({
      ...shippingInfo,
      firstName: EXAMPLE_INFO.customer.firstname,
      lastName: EXAMPLE_INFO.customer.lastname,
      email: EXAMPLE_INFO.customer.email,
      town_city: EXAMPLE_INFO.shipping.town_city,
      street: EXAMPLE_INFO.shipping.street,
      street2: "",
      deliveryRegion: EXAMPLE_INFO.shipping.county_state,
      postal_zip_code: EXAMPLE_INFO.shipping.postal_zip_code,
      phoneNumber: "",
      deliveryCountry: EXAMPLE_INFO.shipping.country,
    });
  };

  const changeShippingInfo = (target, value) => {
    setShippingInfo({
      ...shippingInfo,
      [target]: value,
    });
  };
  useEffect(() => {
    console.log(shippingInfo);
  }, [shippingInfo]);
  useEffect(() => {
    console.log(checkoutTokenId);
  }, [checkoutTokenId]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setProcessing(true);
    // This process includes a few API calls, so now is a good time to show a loading indicator

    // Create a payment method using the card element on the page
    const cardElement = elements.getElement(CardElement);
    const paymentMethodResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (paymentMethodResponse.error) {
      // There was some issue with the information that the customer entered into the payment details form.
      console.error(paymentMethodResponse.error.message);
      console.log(paymentMethodResponse.error);
      setError(`Payment failed 1 ${paymentMethodResponse.error.message}`);
      setProcessing(false);
      return;
    }

    try {
      // TODO: Import name from shipping form
      console.log({
        customer: {
          firstname: shippingInfo.firstName,
          lastname: shippingInfo.lastName,
          email: shippingInfo.email,
        },
        shipping: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          street: shippingInfo.street,
          town_city: shippingInfo.town_city,
          county_state: shippingInfo.deliveryRegion,
          postal_zip_code: shippingInfo.postal_zip_code,
          country: shippingInfo.deliveryCountry,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethodResponse.paymentMethod.id,
          },
        },
      });
      const order = await commerce.checkout.capture(checkoutTokenId, {
        customer: {
          firstname: shippingInfo.firstName,
          lastname: shippingInfo.lastName,
          email: shippingInfo.email,
        },
        shipping: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          street: shippingInfo.street,
          town_city: shippingInfo.town_city,
          county_state: shippingInfo.deliveryRegion,
          postal_zip_code: shippingInfo.postal_zip_code,
          country: shippingInfo.deliveryCountry,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethodResponse.paymentMethod.id,
          },
        },
      });
      console.log(order);
      // If we get here, the order has been successfully captured and the order detail is part of the `order` variable
      const receipt = await commerce.checkout.receipt(checkoutTokenId);
      console.log(receipt)
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      commerce.cart.empty().then(json => {
        changeCart(json.cart)
      });

      return;
    } catch (response) {
      // There was an issue with capturing the order with Commerce.js
      console.log(response);
      console.log(response.message);
      setError(`Payment failed ${response.message}`);
      setProcessing(false);
      return;
    }
  }

  useEffect(() => {
    commerce.checkout
      .generateTokenFrom("cart", commerce.cart.id())
      .then((response) => setCheckoutToken(response.id))

     
  }, []);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const changeValue = (target, value) => {
    setShippingInfo({ ...shippingInfo, [target]: value });
  };

  // code for not using commerce.js

  // const handleSubmit = async ev => {
  //   ev.preventDefault();
  //   setProcessing(true);
  //   const payload = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement)
  //     }
  //   });
  //   if (payload.error) {
  //     setError(`Payment failed ${payload.error.message}`);
  //     setProcessing(false);
  //   } else {
  //     setError(null);
  //     setProcessing(false);
  //     setSucceeded(true);
  //   }
  // };
const handleClose = () =>{
  setSucceeded(false);
  router.push("/");
  
}
  return (
    <div style={{ minWidth: "min(400px,100%)" }}>
      <form onSubmit={handleSubmit}>
        <Button onClick={importDemoShippingInfo}>Import Demo</Button>
        <div style={{ maxWidth: "700px", margin: "auto", padding: "0 20px" }}>
          <ShippingForm
            shippingInfo={shippingInfo}
            changeShippingInfo={changeShippingInfo}
            changeValue={changeValue}
            checkoutToken={checkoutTokenId}
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
                  <CircularProgress size={24} />
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

            <p
              className={succeeded ? "result-message" : "result-message hidden"}
            >
              Payment succeeded, see the result in your
              <a href={`https://dashboard.stripe.com/test/payments`}>
                Stripe dashboard.
              </a>
              Refresh the page to pay again.
            </p>
            
          </div>
        </div>
      </form>
      <Modal
      open={succeeded}
      onClose={handleClose}
      aria-labelledby="edit-review-modal"
      aria-describedby="edits a chosen users review on submit"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
       <div style={{backgroundColor:'white', padding:'20px'}}>
        <h3>Order Successfull!!!</h3>
        <p>We will send you a order confirmation via email</p>
        <Button color="primary" variant="contained" onClick={handleClose}>Go Home</Button>
      </div>       
      </Modal>
    </div>
  );
};
