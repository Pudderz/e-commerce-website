const Product = require("../models/products");
const Order = require("../models/order");
const mongoose = require("mongoose");
const { startDatabase } = require("../database");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const isTokenValid = require("../Authentication/validate");
const jwt_decode = require("jwt-decode");

const updateSoldItems = async (items) => {
  console.log(items);
  for (const item of items) {
    const sold = item.sold == null ? 0 : item.sold;
    await Product.findByIdAndUpdate(item.id, { sold: sold + 1 });
  }
};

const calculateOrderAmount = async (items = []) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log("items");
  const itemsId = [];
  items.forEach((item) => itemsId.push(item.id));
  console.log(itemsId);
  const confirmedItems = {};
  const confirmedItemsArray = [];
  await startDatabase();
  let total = 0;
  await Product.find({ _id: itemsId }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    if (doc == null) {
      console.log("no products found");
    }
    console.log(`doc`);
    console.log(doc.length);
    // console.log(doc);
    //get maxStock,
    doc.forEach((item) => {
      if (typeof item.price !== "undefined") {
        confirmedItems[`${item._id}`] = { price: item.price };
      }
    });
  });

  // console.log(confirmedItems);
  for (let item of items) {
    if (confirmedItems[item.id]) {
      let price = confirmedItems[item.id].price;
      if (typeof price == "undefined") continue;
      total += confirmedItems[item.id].price * 1 * item.quantity;
      confirmedItemsArray.push({ ...item, price });
    }
  }

  return [confirmedItemsArray, total];
};

const generateResponse = async ({
  intent,
  confirmedItems,
  orderAmount,
  request,
}) => {
  console.log("intent");
  // console.log(intent);
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  if (
    intent.status === "requires_action" &&
    intent.next_action.type === "use_stripe_sdk"
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret,
    };
  } else if (intent.status === "succeeded") {
    console.log("payment succeeded")
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    items = [];
    confirmedItems.forEach((item) => {
      items.push(item.id);
    });

    //work out subId
    let subId = "guest";

    try {
      const token = request.headers.authorization;

      let decoded = { sub: null, permissions: [] };

      if (token !== null) {
        console.log("token exists");
        decoded = jwt_decode(token);
        const { error } = await isTokenValid(token);
        
        if (!error && decoded.sub) {
          subId = decoded.sub;
        }
      }
      console.log("finished token");
    }catch(err){
      console.log(err.message);
    }
    console.log(request.body.shipping_details);
    let shippingDetails = request.body.shipping_details;
    console.log(shippingDetails);

    let order = new Order({
      subId: subId,
      date: Date(),
      price: orderAmount,
      items: items,
      shippingAddress: {
        name: shippingDetails.name,
        ...shippingDetails.address,
      },
      status: "Paid",
      orderNotes: shippingDetails.orderNotes,
    });

    let savedOrder = await order.save();
    console.log(`id - ${savedOrder._id}`);
    console.log(savedOrder);

    updateSoldItems(confirmedItems);
    return {
      success: true,
      orderId: savedOrder._id,
    };
  } else {
    // Invalid status
    return {
      error: "Invalid PaymentIntent status",
    };
  }
};

const payServerSide = async (request, response) => {
  const items = request.body.items;
  const [confirmedItems, orderAmount] = await calculateOrderAmount(items);

  // TODO: check if confirmed items and items are the same
  // If not respond back telling user to please verify the new amount of items
  // as our stocks has changed
  console.log(orderAmount);
  if (orderAmount === 0) {
    return response.send({ error: "No items found please try again" });
  }

  try {
    let intent;
    if (request.body.payment_method_id) {
      // Create the PaymentIntent
      intent = await stripe.paymentIntents.create({
        payment_method: request.body.payment_method_id,
        amount: orderAmount,
        currency: "gbp",
        confirmation_method: "manual",
        confirm: true,
      });
    } else if (request.body.payment_intent_id) {
      intent = await stripe.paymentIntents.confirm(
        request.body.payment_intent_id
      );
    }
    // Send the response to the client
    console.log("generating response");
    const res = await generateResponse({
      intent,
      confirmedItems,
      orderAmount,
      request,
    });
    response.send(res);
  } catch (e) {
    // Display error on client
    console.log(e.message);
    return response.send({ error: e.message });
  }
};

const verifyCart = async (request, response) => {
  console.log("creating payment intent");
  const items = request.body;
  // Create a PaymentIntent with the order amount and currency

  const [confirmedItems, orderAmount] = await calculateOrderAmount(items);
  response.send({
    amount: orderAmount,
    confirmedItems: confirmedItems,
  });
};
module.exports = { verifyCart, payServerSide };
