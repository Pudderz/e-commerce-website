const { SimpleGA, Request } = require("node-simple-ga");
const { startDatabase } = require("../database");
const Product = require("./models/products");
require("dotenv").config();

const getGoogleAnalyticsData = async ({ filterByString, res }) => {
  var analytics = new SimpleGA(path.join(__dirname, "./key.json"));

  var request = Request()
    .select("pagepath", "pageviews")
    .from(process.env.GA_VIEW_ID)
    .where("pagepath")
    .beginsWith(filterByString)
    .orderDesc("pageviews")
    .limit(20);


  try {
    var r1 = analytics.run(request);

    var [request] = await Promise.all([r1]);

    console.log(request);

    const slugs = [];
    const search = [];
    request.forEach((element) => {
      let slug = element.pagePath.slice(9);
      if (slug != null) {
        search.push(slug);
        slugs.push({ slug, pageviews: element.pageviews });
      }
    });

    console.log(slugs);

    await startDatabase();
    const products = await Product.find({ slug: search }).lean();

    res.send({ slugs, products });
  } catch (err) {
    console.error(err);
  }
};

const getPopularProducts = (res) => {
  getGoogleAnalyticsData({ filterByString: "/product", res });
};

const getPopularFemaleProducts = (res) => {
  getGoogleAnalyticsData({ filterByString: "/product/f/", res });
};

const getPopularMaleProducts = (res) => {
  getGoogleAnalyticsData({ filterByString: "/product/m/", res });
};

module.exports = {
  getPopularProducts,
  getPopularFemaleProducts,
  getPopularMaleProducts,
};
