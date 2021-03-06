const express = require("express");
const path = require("path");
const app = express();
const PORT = 6969;
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./Schemas");
const mongoose = require("mongoose");
const { SimpleGA, Request } = require("node-simple-ga");
const isTokenValid = require("./Authenication/validate");
const jwt_decode = require("jwt-decode");
var fs = require("fs");

let database = null;

let GOOGLE_PAGEPATHS = {};

require("dotenv").config();
const uri = `mongodb+srv://dbAdmin:${process.env.MONGODB_PASSWORD}@cluster0.s5qsx.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`;
console.log(uri);

const startDatabase = () => {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("db connection is okay");

        if (!database) {
          console.log("no database set");
        }
      }
    }
  );
};

const context = async (req) => {
  const db = await startDatabase();
  const token = req.headers.authorization;
  let decoded = { sub: null };
  if (token) {
    decoded = jwt_decode(token);
    console.log(decoded);
  }

  return { db, token, subId: decoded.sub };
};

app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP(async (req) => ({
    schema,
    graphiql: true,
    context: () => context(req),
  }))
);

app.use("/trending", (req, res) => {
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
      requestPopularProducts.forEach((element) => {
        let slug = element.pagePath.slice(9);
        if (slug != null) {
          slugs.push({ slug, pageviews: element.pageviews });
        }
      });

      console.log(slugs);
      res.send(slugs);
      GOOGLE_PAGEPATHS = slugs;
    } catch (err) {
      console.error(err);
    }
  })();
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
