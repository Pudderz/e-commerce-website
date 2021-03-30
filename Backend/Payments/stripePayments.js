const Product = require("../models/products");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const uri = `mongodb+srv://dbAdmin:${process.env.MONGODB_PASSWORD}@cluster0.s5qsx.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
const startDatabase = () => {
  console.log("connecting to the database");
  return mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("db connection is okay");

        // if (!database) {
        //   console.log("no database set");
        // }
      }
    }
  );
};

const calculateOrderAmount = async (items = []) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log("items");
  const itemsId = [];
  items.forEach(item=> itemsId.push(item.id));
console.log(itemsId)
  const confirmedItems = {};
  const confirmedItemsArray = [];
  const db = await startDatabase();
  let total = 0;
  await Product.find({_id: itemsId}, (err, doc) => {
    if (err) {
      console.log(err);
    }
    if (doc == null) {
      console.log("no products found");
    }
    console.log(`doc`);
    console.log(doc);
    //get maxStock,
    doc.forEach((item) => {
      if (typeof item.price !== "undefined") {
        confirmedItems[`${item._id}`] = { price: item.price };
      }
    });
  });


  console.log(confirmedItems);
  for (let item of items) {
    if (confirmedItems[item.id]) {
      let price = confirmedItems[item.id].price;
      if (typeof price == "undefined") continue;
      total += confirmedItems[item.id].price * 100 * item.quantity;
      confirmedItemsArray.push({ ...item, price });
    }
  }

  return [confirmedItemsArray, total];
};

const createPaymentIntent = async (req, res) => {
  console.log("creating payment intent");
  const items = req.body;
  // Create a PaymentIntent with the order amount and currency

  const [confirmedItems, orderAmount] = await calculateOrderAmount(items);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderAmount,
    currency: "gbp",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    amount: orderAmount,
    confirmedItems: confirmedItems,
  });
};

const confirmCardPayment = (paymentIntentClientSecret) => {};

module.exports = { createPaymentIntent };
