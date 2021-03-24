const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

const createPaymentIntent = async (req, res) => {
  console.log("creating payment intent");
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "gbp",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    amount: calculateOrderAmount(items),
  });
};


const confirmCardPayment = (paymentIntentClientSecret) =>{
    

}

module.exports = {createPaymentIntent};
