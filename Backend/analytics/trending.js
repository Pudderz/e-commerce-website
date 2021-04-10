const { SimpleGA, Request } = require("node-simple-ga");
const { startDatabase } = require("../database");
const Product = require("../models/products");
const path = require("path");
require("dotenv").config();

const getGoogleAnalyticsData = async ({ filterByString, res, header }) => {
  var analytics = new SimpleGA(path.join(__dirname, "../googleKey.json"));

  var request = Request()
    .select("pagepath", "pageviews")
    .from(process.env.GA_VIEW_ID)
    .where("pagepath")
    .beginsWith(filterByString)
    .orderDesc("pageviews")
    .limit(20);
  try {
    var r1 = analytics.run(request);

    var [requestResult] = await Promise.all([r1]);

    const slugs = [];
    const search = [];
    requestResult.forEach((element) => {
      let slug = element.pagePath.slice(9);
      if (slug != null) {
        search.push(slug);
        slugs.push({ slug, pageviews: element.pageviews });
      }
    });

    console.log(slugs);

    await startDatabase();
    let products;

    if (header) {
      products = await Product.find(
        { slug: search },
        { productName: 1, slug: 1 }
      ).lean();
      console.log("trending fin");
      return products;
    } else {
      products = await Product.find(
        { slug: search },
        {
          productName: 1,
          slug: 1,
          images: 1,
          discounted: 1,
          discountedFrom: 1,
          price: 1,
        }
      ).lean();
      console.log("trending fin");
      res.send({ slugs, products });
    }
  } catch (err) {
    console.log("catch has ran");
    console.error(err);
    if (header) return [];

    res.send({ slugs: [], products: [], error: err });
  }
};

const getPopularProducts = (res) => {
  getGoogleAnalyticsData({ filterByString: "/product", res, header: false });
};

const getPopularFemaleProducts = (res) => {
  getGoogleAnalyticsData({ filterByString: "/product/f/", res, header: false });
};

const getPopularMaleProducts = (res) => {
  getGoogleAnalyticsData({ filterByString: "/product/m/", res, header: false });
};

const getHeaderProducts = async (res) => {
  const maleData = await getGoogleAnalyticsData({
    filterByString: "/product/m/",
    res,
    header: true,
  });
  const femaleData = await getGoogleAnalyticsData({
    filterByString: "/product/f/",
    res,
    header: true,
  });
  res.send({ maleData, femaleData });
};
module.exports = {
  getPopularProducts,
  getPopularFemaleProducts,
  getPopularMaleProducts,
  getHeaderProducts,
};
