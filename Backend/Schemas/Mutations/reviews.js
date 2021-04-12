const graphql = require("graphql");
const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;
const {
  ProductReviews,
} = require("../TypeDefs/ReviewType");
const isTokenValid = require("../../Authentication/validate");
const Review = require("../../models/review");
const { ObjectId } = require("mongodb");


const reviewMutations = {
    createReview: {
      type: ProductReviews,
      args: {
        productId: { type: GraphQLString },
        productName: { type: GraphQLString },
        name: { type: GraphQLString },
        profileImage: { type: GraphQLString },
        rating: { type: GraphQLString },
        descriptionTitle: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const { db, token, subId } = await context();
        // Tests if user is authenticated to create a review
        let { error } = await isTokenValid(token);
        console.log(`is Authenicated - ${!error}`);

        error = false;

        //Return null if not authenticated
        if (error) return null;

        // Return null if there is no subId to identify the user
        if (!subId) return null;

        let review = new Review({
          productId: ObjectId(args.productId),
          subId: subId,
          productName: args.productName,
          name: args.name,
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
        id: { type: GraphQLString },
        sub: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        console.log("deleting Review");
        console.log(args.id);
        const id = ObjectId(args.id);

        const { db, token, subId } = await context();
        //Test if JWT is valid
        const { error } = await isTokenValid(token);
        if (error) return null;

        if (!subId) return null;

        try {
          const review = await Review.findById(
            { _id: id, subId: subId },
            (err, doc) => {
              // if(err){
              //   return null;
              // }else{
              //   console.log(doc.name, doc.productName)
              // }
            }
          );
          // console.log(review);
          return await Review.findOneAndDelete(
            { _id: id, subId: subId },
            (err, doc) => {
              // if(err){
              //   return null;
              // }else{
              //   console.log(doc.name, doc.productName)
              // }
            }
          );
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
      resolve: async (parent, args, context) => {
        console.log("editing a review");
        console.log(args);
        const { db, token, subId } = await context();
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
