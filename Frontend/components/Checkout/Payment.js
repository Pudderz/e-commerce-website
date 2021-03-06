import { Button, CircularProgress, Modal } from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext, useState, useEffect, useRef } from "react";
import ShippingForm from "./ShippingForm";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  addCartItem,
  removeCartItem,
  addCartItemQuantity,
} from "../../Redux/actions/actions";
import { CHECKOUT_CARD_OPTIONS, CHECKOUT_EXAMPLE_INFO } from "../../globals/globals";


export const Payment = ({ cartInfo, items, price, changeItems,emptyCart }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const router = useRouter();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [orderId, setOrderId] = useState("");
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
      firstName: CHECKOUT_EXAMPLE_INFO.customer.firstname,
      lastName: CHECKOUT_EXAMPLE_INFO.customer.lastname,
      email: CHECKOUT_EXAMPLE_INFO.customer.email,
      town_city: CHECKOUT_EXAMPLE_INFO.shipping.town_city,
      street: CHECKOUT_EXAMPLE_INFO.shipping.street,
      street2: "",
      deliveryRegion: CHECKOUT_EXAMPLE_INFO.shipping.county_state,
      postal_zip_code: CHECKOUT_EXAMPLE_INFO.shipping.postal_zip_code,
      phoneNumber: "",
      deliveryCountry: CHECKOUT_EXAMPLE_INFO.shipping.country,
    });
  };

  const changeShippingInfo = (target, value) => {
    setShippingInfo({
      ...shippingInfo,
      [target]: value,
    });
  };

  
  const handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
      setError(`Payment failed ${response.error}`);
      setProcessing(false);
      if(response.amount && response.confirmedItems){
        changeItems({amount: response.amount, items:response.confirmedItems})
      }
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const {
        error: errorAction,
        paymentIntent,
      } = await stripe.handleCardAction(response.payment_intent_client_secret);

      if (errorAction) {
        // Show error from Stripe.js in payment form
        setError(`${errorAction}`);
        setProcessing(false);
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        let token = null;
        token = (isAuthenticated)? await getAccessTokenSilently(): '';

        const serverResponse = await fetch(
          `${process.env.BACKEND_SERVER}/pay`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : null,
            },
            body: JSON.stringify({
              payment_intent_id: paymentIntent.id,
              items,
              shipping_details: {
                name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
                address: {
                  street: shippingInfo.street,
                  city: shippingInfo.town_city,
                  country: shippingInfo.deliveryCountry,
                  postalCode: shippingInfo.postal_zip_code,
                },
                orderNotes: shippingInfo.orderNotes,
              },
            }),
          }
        );
        handleServerResponse(await serverResponse.json());
      }
    } else {
      emptyCart();
      console.log(response);
      setOrderId(response.orderId);
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const stripePaymentMethodHandler = async (result) => {
    if (result.error) {
      // Show error in payment form
      setError(`Payment failed ${result.error}`);
      setProcessing(false);
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 4)

      // get access token for saving future order if payment is successful
      let token = (isAuthenticated)? await getAccessTokenSilently() : '';

      const res = await fetch(`${process.env.BACKEND_SERVER}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : null,
        },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
          items,
          shipping_details: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            address: {
              street: shippingInfo.street,
              city: shippingInfo.town_city,
              country: shippingInfo.deliveryCountry,
              postalCode: shippingInfo.postal_zip_code,
            },
            orderNotes: shippingInfo.orderNotes,
          },
          price
        }),
      });
      const paymentResponse = await res.json();

      // Handle server response (see Step 4)
      handleServerResponse(paymentResponse);
    }
  };

  const handleStripeSubmit = async (ev) => {
    ev.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setProcessing(true);

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        address: {
          line1: shippingInfo.street,
          city: shippingInfo.town_city,
          country: shippingInfo.deliveryCountry,
          postal_code: shippingInfo.postal_zip_code,
          state: shippingInfo.deliveryRegion,
        },
      },
    });

    console.log(result);

    stripePaymentMethodHandler(result);
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const changeValue = (target, value) => {
    setShippingInfo({ ...shippingInfo, [target]: value });
  };

  const handleClose = () => {
    setSucceeded(false);
    router.push("/");
  };
  return (
    <div style={{ minWidth: "min(100%,650px)", margin:'auto' }}>
      <form onSubmit={handleStripeSubmit}>
        <Button onClick={importDemoShippingInfo}>Import Demo</Button>
        <div style={{ maxWidth: "700px", margin: "auto", padding: "0 20px" }}>
          <ShippingForm
            shippingInfo={shippingInfo}
            changeShippingInfo={changeShippingInfo}
            changeValue={changeValue}
            items={items}
            price={price}
          />
          <h3>Payment Detail</h3>
          <div style={{ border: "1px solid gray", padding: "10px" }}>
            <div style={{ textAlign: "start" }}>
              <p style={{ margin: "2px 0 10px" }}>Credit/Debit card</p>

              <hr />
              <CardElement options={CHECKOUT_CARD_OPTIONS} onChange={handleChange} />
              <p>Example card - 4242 4242 4242 4242</p>
              <p>04/24 242 42424</p>
              <p>Example 3d secure card - 4000 0025 0000 3155</p>
              <p>04/24 242 42424</p>
            </div>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={processing || disabled || succeeded}
              style={{
                 backgroundColor: (disabled)? "#444": "#111",
                color: "#fff",
                padding: "5px",
                width: "100%",
                marginTop: "20px",
                borderRadius: "5px",
                fontSize: "18px",
                cursor:'pointer'
              }}
            >
              <span id="button-text">
                {processing ? (
                  <CircularProgress size={24} />
                ) : (
                  `Pay £${(price / 100).toFixed(2)}`
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
              Payment succeeded
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
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          <h3>Order Successfull!</h3>
          <p>We will send you a order confirmation via email</p>
          <p>Order ID: {orderId}</p>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Go Home
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  cartState: state.cart.cart,
  cartInfo: state.cart.cartInfo,
  props: { ...ownProps },
});

const mapDispatchToProps = {
  addCartItem,
  removeCartItem,
  addCartItemQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
