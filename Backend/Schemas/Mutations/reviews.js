const graphql = require("graphql");
const { GraphQLString, GraphQLNonNull, GraphQLInt } = graphql;
const { ProductReviews } = require("../TypeDefs/ReviewType");
const isTokenValid = require("../../Authentication/validate");
const Review = require("../../models/review");
const { ObjectId } = require("mongodb");

const reviewMutations = {
  createReview: {
    type: ProductReviews,
    args: {
      productId: { type: GraphQLString },
      productName: { type: new GraphQLNonNull(GraphQLString) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      profileImage: { type: new GraphQLNonNull(GraphQLString) },
      rating: { type: new GraphQLNonNull(GraphQLInt) },
      descriptionTitle: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, context) => {
      const { db, token, subId } = await context();
      // Tests if user is authenticated to create a review
      let { error } = await isTokenValid(token);
      console.log(`is Authenicated - ${!error}`);

      // Guard clauses
      error = false;
      console.log(args);
      //Return null if not authenticated
      if (error) return null;
      // Return null if there is no subId to identify the user
      if (!subId) return null;

      // if(args.rating < 0 || args.rating > 50 || args.rating%5 ==0){
      //   return new Error("You have entered an invalid Rating")
      // }

      const review = new Review({
        productId: ObjectId(args.productId),
        subId: subId,
        productName: args.productName,
        username: args.name,
        profileImage: args.profileImage,
        rating: args.rating,
        descriptionTitle: args.descriptionTitle,
        description: args.description,
      });

      return !error ? review.save() : null;
    },
  },

  // TODO: edits number of reviews and updates overall rating for that product
  // for deleteReview and edit Review
  deleteReview: {
    type: ProductReviews,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      sub: { type: GraphQLString },
    },
    resolve: async (parent, args, context) => {
      console.log("deleting Review");
      console.log(args.id);
      const id = ObjectId(args.id);

      const { token, subId } = await context();
      //Test if JWT is valid
      const { error } = await isTokenValid(token);
      if (error) return null;

      if (!subId) return null;

      try {
        return await Review.findOneAndDelete({ _id: id, subId: subId });
      } catch (err) {
        console.log("error" + err);
        return null;
      }
    },
  },
  editReview: {
    type: ProductReviews,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      rating: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, args, context) => {
      console.log("editing a review");
      console.log(args);
      const { token, subId } = await context();
      //Test if JWT is valid
      const { error } = await isTokenValid(token);
      if (error) return null;
      if (!subId) return null;

      try {
        return await Review.findOneAndUpdate(
          { _id: ObjectId(args.id), subId: subId },
          {
            descriptionTitle: args.title,
            description: args.description,
            rating: args.rating,
            edited: true,
          },
          { new: true, useFindAndModify: true },
          (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
              return null;
            }
            console.log(doc);
          }
        );
      } catch (err) {
        console.log("error" + err);
        return null;
      }
    },
  },
};

module.exports = { reviewMutations };
