const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
// This is your real test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.use(cors());
app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
app.post("/create-payment-intent", async (req, res) => {
  console.log('creating payment intent')
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "gbp"
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    amount:calculateOrderAmount(items),
  });
});
app.listen(4242, () => console.log('Node server listening on port 4242!'));