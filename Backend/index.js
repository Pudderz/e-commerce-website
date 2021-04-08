const express = require("express");
const path = require("path");
const app = express();
const PORT = 6969;
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");
const mongoose = require("mongoose");
const { SimpleGA, Request } = require("node-simple-ga");
const jwt_decode = require("jwt-decode");
var fs = require("fs");
const {Storage} = require("@google-cloud/storage");
const bodyParser = require("body-parser");
const {apolloUploadExpress}= require("apollo-upload-server");
const { graphqlUploadExpress } = require('graphql-upload');
const { createPaymentIntent } = require("./Payments/stripePayments");
const Product = require("./models/products");
const { searchconsole } = require("googleapis/build/src/apis/searchconsole");
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
  if (!fs.existsSync("./key.json")) {
    //create json file for analytics
    let data = {
    "type": "service_account",
    "project_id": "e-commerce-web-project",
    "private_key_id": process.env.GA_PRIVATE_KEY_ID ,
    "private_key": process.env.GA_PRIVATE_KEY,
    "client_email": process.env.GA_CLIENT_EMAIL,
    "client_id": process.env.GA_CLIENT_ID ,
    "auth_uri": process.env.GA_AUTH_URI ,
    "token_uri": process.env.GA_TOKEN_URI ,
    "auth_provider_x509_cert_url": process.env.GA_PROVIDER_CERT,
    "client_x509_cert_url": process.env.GA_CLIENT_CERT_URL,
  }
    data = JSON.stringify(data);

    fs.writeFileSync("key.json", data);
  }
  (async function () {
    var analytics = new SimpleGA(path.join(__dirname, "./key.json"));

    var requestPopularProducts = Request()
      .select("pagepath", "pageviews")
      .from(process.env.GA_VIEW_ID)
      .where("pagepath")
      .beginsWith("/product")
      .orderDesc("pageviews")
      .limit(20);

    try {
      var r1 = analytics.run(requestPopularProducts);

      var [requestPopularProducts] = await Promise.all([r1]);

      console.log(requestPopularProducts);

      const slugs = [];
      const search = [];
      requestPopularProducts.forEach((element) => {
        let slug = element.pagePath.slice(9);
        if (slug != null) {
          search.push(slug)
          slugs.push({ slug, pageviews: element.pageviews });
        }
      });

      console.log(slugs);
      await startDatabase();
      const products =  await Product.find({slug: search}, (err, data)=>{
        console.log(data.length);
      }).lean();
      console.log(products)
      res.send({slugs, products});
      GOOGLE_PAGEPATHS = slugs;
    } catch (err) {
      console.error(err);
    }
  })();
});

app.use("/createPaymentIntent", (req, res)=>createPaymentIntent(req, res));



app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
