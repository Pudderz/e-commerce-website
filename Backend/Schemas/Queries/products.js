const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;
const {
  ProductType,
} = require("../TypeDefs/ProductType");

const Product = require("../../models/products");
const { GraphQLFloat } = require("graphql");



const productQueries = {
  getAllProducts: {
    type: new GraphQLList(ProductType),
    args: {
      id: { type: GraphQLInt },
      category: { type: GraphQLString },
      male: { type: GraphQLBoolean },
      female: { type: GraphQLBoolean },
      unisex: { type: GraphQLBoolean },
      under100: { type: GraphQLBoolean },
      between100And150: { type: GraphQLBoolean },
      over150: { type: GraphQLBoolean },
      discounted: { type: GraphQLBoolean },
      casual: { type: GraphQLBoolean },
      hiking: { type: GraphQLBoolean },
      running: { type: GraphQLBoolean },
      search: { type: GraphQLString },
      limit: { type: GraphQLInt },
      skip: { type: GraphQLInt },
      stockSize: { type: new GraphQLList(GraphQLFloat) },
      sortBy: { type: GraphQLString },
      shoeSizes: { type: new GraphQLList(GraphQLFloat) },
    },
    resolve: async (parent, args, context) => {
      await context();
      let sortBy = {};

      // work out search parameters

      let searchParameters = {};

      //searchBar
      if (args.search) {
        searchParameters.productName = { $regex: args.search, $options: "i" };
      }

      //filterBy gender
      if (args.male || args.female || args.unisex) {
        const filterGender = [];
        if (args.male) filterGender.push("male");
        if (args.female) filterGender.push("female");
        if (args.unisex) filterGender.push("unisex");
        if (filterGender.length < 3 && filterGender.length > 0) {
          console.log(filterGender);
          searchParameters.gender = filterGender;
        }
      }

      //filterBy category

      if (args.hiking || args.running || args.casual) {
        const filterCategory = [];
        if (args.hiking) filterCategory.push("hiking");
        if (args.running) filterCategory.push("running");
        if (args.casual) filterCategory.push("casual");
        if (filterCategory.length < 3 && filterCategory.length > 0) {
          console.log(filterCategory);
          searchParameters.categories = {$in: filterCategory};
        }
      }


      // filter by shoe size
      if (args.stockSize && args.stockSize.length > 0) {
        searchParameters.stock = {
          $elemMatch: { stock: { $gt: 0 }, shoeSize: [...args.stockSize] },
        };
      }

      // filter by discounted products
      if (args.discounted) {
        searchParameters.discounted = true;
      }

      // filter by categories
      if (typeof args.category !== "undefined") {
        searchParameters.categories = args.category;
      }

      // filter by prices

      if (
        (args.under100 || args.between100And150 || args.over150) &&
        !(args.under100 && args.between100And150 && args.over150)
      ) {
        if(args.under100 && args.over150){
          searchParameters.$or = [{price: {$lt:10000}},{price: {$gt: 15000}}]
        }else if(args.between100And150 && args.over150){
          searchParameters.price = {$gt:10000};
        }else if(args.between100And150 && args.under100){
          searchParameters.price = {$lte:15000};
        }else if(args.under100){
          searchParameters.price = {$lte:10000};
        }else if(args.between100And150){
          searchParameters.$and = [{price: {$lte:15000}},{price: {$gt: 10000}}]
        }else if(args.over150){
          searchParameters.price = {$gt:15000};
        }
      }
      // Sort by Section

      if (args.sortBy) {
        switch (args.sortBy) {
          case "sold": {
            sortBy.sold = -1;
            break;
          }
          case "LowToHigh": {
            sortBy.price = 1;
            break;
          }
          case "HighToLow": {
            sortBy.price = -1;
            break;
          }
          default: {
            sortBy.datePosted = "desc";
          }
        }
      } else {
        sortBy.datePosted = "desc";
      }

      if (args.limit) {
        if (args.skip) {
          return Product.find({ ...searchParameters })
            .sort({ ...sortBy, _id: 1 })
            .skip(args.skip)
            .limit(args.limit);
        }
        return Product.find({ ...searchParameters })
          .sort({ ...sortBy, _id: 1 })
          .limit(args.limit);
      }
      return Product.find({ ...searchParameters }).sort({
        ...sortBy,
        _id: 1,
      });
    },
  },
  getProduct: {
    type: new GraphQLList(ProductType),
    args: {
      productId: { type: GraphQLString },
      productName: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, context) => {
      console.log(args);
      await context();
      console.log("finding");
      return Product.find({ productName: args.productName });
    },
  },
  getProductBySlug: {
    type: ProductType,
    args: { slug: { type: GraphQLString } },
    resolve: async (parent, args, context) => {
      const { db, token } = await context();
      console.log("getProductBySlug");
      console.log(args.slug);
      return Product.findOne({ slug: args.slug });
    },
  },
}



module.exports={ productQueries }