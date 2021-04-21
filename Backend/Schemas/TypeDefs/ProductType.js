const graphql = require("graphql");
const Review = require("../../models/review");
const { ProductReviews } = require("./ReviewType");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat,
} = graphql;

const StockSize = new GraphQLObjectType({
  name: "stockSize",
  fields: () => ({
    shoeSize: { type: GraphQLInt },
    stock: { type: GraphQLInt },
  }),
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    _id: { type: GraphQLID },
    productName: { type: GraphQLString },
    price: { type: GraphQLInt },
    description: { type: GraphQLString },
    stock: { type: new GraphQLList(StockSize) },
    images: { type: new GraphQLList(GraphQLString) },
    datePosted: { type: GraphQLInt },
    categories: { type: new GraphQLList(GraphQLString) },
    slug: { type: GraphQLString },
    discounted: { type: GraphQLBoolean },
    discountedFrom: { type: GraphQLInt },
    gender: { type: GraphQLString },
    sold: { type: GraphQLInt },
    numOfReviews: {
      type: GraphQLInt,
      resolve(parent, args) {
        return Review.find({ productId: parent._id}).count();
      },
    },
    averageRating: {
      type: GraphQLFloat,
      resolve: async (parent, args) => {
        try {
          const rating = await Review.aggregate([
            {
              $match: {
                productName: parent.productName,
                rating: { $gte: 0, $lte: 50 },
              },
            },
            {
              $group: {
                _id: null,
                averageReview: { $avg: "$rating" },
              },
            },
          ]);

          if (rating[0]) {
            return rating[0].averageReview.toFixed(2);
          } else {
            return 0;
          }
        } catch {
          return 0;
        }
      },
    },
    allProductReviews: {
      type: new GraphQLList(ProductReviews),
      resolve(parent, args) {
        return Review.find({ productName: parent.productName });
      },
    },
  }),
});

module.exports = { ProductType };
