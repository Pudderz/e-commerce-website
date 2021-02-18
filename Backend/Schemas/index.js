const graphql = require("graphql");
const mongoose = require("mongoose")
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = graphql;
const { ProductType, ProductReviews } = require("./TypeDefs/UserType");
const reviewData = require("../reviewDataExample.json");
const isTokenValid = require("../Authenication/validate");
const Review = require("../models/review");
const Product = require("../models/products");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Product.find({});
      },
    },
    getAllReviews: {
      type: new GraphQLList(ProductReviews),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Review.find({});
      },
    },
    getUserReviews: {
      type: new GraphQLList(ProductReviews),
      args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
      resolve(parent, args) {
        return Review.find({ name: args.name });
      },
    },
    getProduct:{
      type: new GraphQLList(ProductType),
      args: {
        productId: { type: GraphQLString },
        productName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        console.log('finding');
        return Product.find({ productName: args.productName });
      },
    }
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createProduct: {
      type: ProductType,
      args: {
        productId: { type: new GraphQLNonNull(GraphQLString) },
        productName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        // reviewData.push({
        //   id: reviewData.length + 1,
        //   firstName: args.firstName,
        //   lastName: args.lastName,
        // });
        const { db, token } = await context();
        // Tests if user is authenticated to create a review
        const { error } = await isTokenValid(token);

        if (error) return null;

        let product = new Product({
          productId: args.productId,
          productName: args.productName,
          numOfReviews: 0,
          averageRating: 0,
        });

        return product.save();
      },
    },
    createReview: {
      type: ProductType,
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
        const { db, token } = await context();
        // Tests if user is authenticated to create a review
        let { error } = await isTokenValid(token);
        console.log(`is Authenicated - ${!error}`);

        error = false;

        //Return null if not authenticated
        if (error) return null;

        let review = new Review({
          productId: args.productId,
          productName: args.productName,
          name: args.name,
          profileImage: args.profileImage,
          rating: args.rating,
          descriptionTitle: args.descriptionTitle,
          description: args.description,
        });
        

        let product;
        await Product.findOne({ productId: args.productId }, function (err, obj) {
          
          product = obj;
          
        });
        

        console.log(product);
        console.log(!!product);
         console.log(mongoose.connection.readyState=== 1);
         console.log(typeof product === 'undefined');
         console.log(product === product);

        if((typeof product === 'undefined' || !product ) && mongoose.connection.readyState=== 1){
          console.log(`${ args.productId} not found`)

          product = new Product({
            productId:args.productId,
            productName:args.productName,
            numOfReviews: 1,
            averageRating: args.rating,

          })

          product.save();

        }else{
          
          console.log(!(typeof product === 'undefined'))
          if(!(typeof product === 'undefined')){
          console.log(`${ args.productId} found`)  
const rating = (1 * product.averageRating * product.numOfReviews +
            1 * args.rating) /
          (product.numOfReviews + 1);
          console.log(rating);
          console.log(product.numOfReviews + 1);
          const numOfReviews = product.numOfReviews + 1;
          await Product.updateOne({productId:args.productId},
            {"$set":
            {
            numOfReviews:  numOfReviews,
            averageRating: `${rating}`
            },

          }

          )
          }
          
        }

        return !error ? review.save() : null;
        // for(product in reviewData){
        //   if(product.productId === args.productId){
        //     product.allProductReviews.push({
        //       id:product.allProductReviews.length+1,
        //       name:args.name,
        //       rating: args.rating,
        //       descriptionTitle:args.description,
        //       description: args.descriptionTitle,
        //     })

        //     reviewData[i].averageRating = (reviewData[i].averageRating*reviewData[i].numOfReviews+args.rating/(reviewData[i].numOfReviews+1))
        //     reviewData[i].numOfReviews ++;
        //     match = true;
        //     break;
        //   }
        //   i++;
        // }
        // if(!match){

        //   console.log(`is Authenicated - ${!error}`)
        //   console.log(error)
        // if(!error){

        //   reviewData[0].allProductReviews.push({
        //   id: reviewData[0].allProductReviews.length + 1,
        //   name: args.name,
        //   rating: args.rating,
        //   descriptionTitle: args.description,
        //   description: args.descriptionTitle,
        //   profileImage: args.profileImage,
        // });
        // // }

        // reviewData[0].averageRating =
        //   (1 * reviewData[0].averageRating * reviewData[0].numOfReviews +
        //     1 * args.rating) /
        //   (reviewData[0].numOfReviews + 1);
        // reviewData[0].numOfReviews = reviewData[0].allProductReviews.length;
        // console.log("added review");
        // }

        // return (!error)? args: null;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
