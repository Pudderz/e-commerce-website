const graphql = require("graphql");

const {
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = graphql;

const {
  ProductReviews,
} = require("../TypeDefs/ReviewType");
const isTokenValid = require("../../Authentication/validate");
const Review = require("../../models/review");


const reviewQueries = {
  getAllReviews: {
    type: new GraphQLList(ProductReviews),
    args: { id: { type: GraphQLID } },
    resolve(parent, args, context) {
      return Review.find({});
    },
  },

  getUserReviews: {
    type: new GraphQLList(ProductReviews),
    args: { sub: { type: GraphQLString } },
    resolve: async (parent, args, context) => {
      console.log("getting user reviews");
      console.log(args.sub);

      const { db, token, subId } = await context();
      //Test if JWT is valid

      const { error } = await isTokenValid(token);
      if (error) return null;
      if (!subId) return null;

      //get sub id from accessToken
      //return all reviews with that subId
      return Review.find({ subId: subId });
    },
  },
};

module.exports = { reviewQueries };
