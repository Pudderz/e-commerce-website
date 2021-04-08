const express = require("express");
const app = express();
const PORT = 6969;
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");
const jwt_decode = require("jwt-decode");
const { graphqlUploadExpress } = require('graphql-upload');
const { createPaymentIntent } = require("./Payments/stripePayments");
const { startDatabase } = require("./database");
const { getPopularProducts, getPopularMaleProducts, getPopularFemaleProducts } = require("./analytics/trending");
const { checkKeyFile } = require("./analytics/key");
require("dotenv").config();


const context = async (req) => {
  db = await startDatabase();
  const token = req.headers.authorization;
  let decoded = { sub: null, permissions: [] };
  if (token) {
    decoded = jwt_decode(token);
  }

  return { db, token, subId: decoded.sub, permissions: decoded.permissions };
};


app.use(cors());

app.use(express.json());

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP(async (req) => ({
    schema,
    graphiql: true,
    context: () => context(req),
  }))
);


app.use("/trending", async(req, res) => {
  checkKeyFile();
  getPopularProducts(res);
});

app.use("/trendingMen", async(req, res) => {
  checkKeyFile();
  getPopularMaleProducts(res);
});


app.use("/trendingFemale", async(req, res) => {
  checkKeyFile();
  getPopularFemaleProducts(res);
});

app.use("/createPaymentIntent", (req, res)=>createPaymentIntent(req, res));



app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
