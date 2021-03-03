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
const isTokenValid = require("../Authenication/validate");
const Review = require("../models/review");
const Product = require("../models/products");
const Order = require("../models/order");
const { ObjectId } = require("mongodb");

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
    },
      getUserReviews: {
      type: new GraphQLList(ProductReviews),
      args: { sub: { type: GraphQLString }},
      resolve: async (parent, args, context)=> {
        console.log('getting user reviews');
        console.log(args.sub)

        const { db, token, subId } = await context();
        // //Test if JWT is valid
        
        const { error } = await isTokenValid(token);
        if (error) return null;

        if(!subId) return null;
        //get sub id from accessToken
        // return Review.find({});
        return Review.find({ subId: subId});
      },
    },

    getUserOrders:{
      type: new GraphQLList(ProductReviews),
      args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
      resolve: async (parent, args, context)=> {
        const { db, token, subId } = await context();
        //Test if JWT is valid
        const { error } = await isTokenValid(token);
        if (error) return null;

        if(!subId) return null;

        //get sub id from accessToken
      

        return Order.find({ subId: subId });
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
          productId: args.productId,
          subId: subId,
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
     
      },
    },
    deleteReview: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {

        return Review.findOneAndDelete(ObjectId(args.id))
      }
    },
    editReview: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args, context) => {
        
        return Review.findOneAndUpdate(ObjectId(args.id), {$set:{}}, {new: true}, (err,doc)=>{
          if(err){
            console.log("Something wrong when updating data!");
          }
          console.log(doc)
        })
      }
    }
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
