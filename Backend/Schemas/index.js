const graphql = require("graphql");
const mongoose = require("mongoose");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = graphql;
const {
  ProductType,
  ProductReviews,
  FileType,
  UserOrders,
} = require("./TypeDefs/UserType");
const isTokenValid = require("../Authenication/validate");
const Review = require("../models/review");
const Product = require("../models/products");
const Order = require("../models/order");
const { ObjectId } = require("mongodb");
const { TypeComposer, schemaComposer } = require("graphql-compose");
// const { GraphQLUpload } = require('apollo-upload-server');
const { GraphQLUpload } = require("graphql-upload");
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const files = [];

const gc = new Storage({
  keyFilename: path.join(__dirname, "../key.json"),
  projectId: "e-commerce-web-project",
});

// gc.getBuckets().then(x=>console.log(x));
const projectImages = gc.bucket("e-commerce-image-storage-202");
console.log(projectImages);

// schemaComposer.set('Upload', GraphQLUpload);

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLInt } },
      resolve: async (parent, args, context) => {
        await context();
        return Product.find({});
      },
    },
    getAllReviews: {
      type: new GraphQLList(ProductReviews),
      args: { id: { type: GraphQLID } },
      resolve(parent, args, context) {
        return Review.find({});
      },
    },
    files: {
      type: new GraphQLList(GraphQLString),
      resolve() {
        return files;
      },
    },

    getProduct: {
      type: new GraphQLList(ProductType),
      args: {
        productId: { type: GraphQLString },
        productName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        await context();
        console.log("finding");
        return Product.find({ productName: args.productName });
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

    getUserOrders: {
      type: new GraphQLList(UserOrders),
      args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
      resolve: async (parent, args, context) => {
        const { db, token, subId } = await context();
        //Test if JWT is valid
        const { error } = await isTokenValid(token);
        if (error) return null;

        if (!subId) return null;

        //get sub id from accessToken
        //returns all orders with that subId
        return Order.find({ subId: subId });
      },
    },
    getAllOrders: {
      type: new GraphQLList(UserOrders),
      args: { id: { type: GraphQLID }, name: { type: GraphQLString } },
      resolve: async (parent, args, context) => {
        const { db, token, subId, permissions } = await context();
        //Test if JWT is valid
        const { error } = await isTokenValid(token);
        if (error) return null;

        if (!subId) return null;
        if (!permissions.includes("read:allOrders")) return;
        //get sub id from accessToken
        //returns all orders with that subId
        return Order.find({});
      },
    },
    getProductBySlug: {
      type: ProductType,
      args: {slug: {type: GraphQLString}},
      resolve: async (parent, args, context) => {
        const { db, token } = await context();
        console.log('getProductBySlug');
        console.log(args.slug)
        return Product.findOne({slug: args.slug });
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
        productname: {type: GraphQLString},
        slug: {type: GraphQLString},
        price: {type: GraphQLString},
        description: {type: GraphQLString},
        files: { type: new GraphQLList(GraphQLUpload) },
        stock: {type: new GraphQLList(GraphQLInt)},
      },
      resolve: async (parent, args, context) => {
        const { db, token } = await context();
        // Tests if user is authenticated to create a review
        const { error } = await isTokenValid(token);
        if (error) return null;
        const { files } = args;
        console.log(args)
        let fileNameArray = [];
        for(let img of files){
           const { createReadStream, filename } = await img;
            await new Promise((res) =>
                      createReadStream()
                        .pipe(
                          projectImages.file(filename).createWriteStream({
                            resumable: false,
                            gzip: true,
                          })
                        )
                        .on("finish", res)
                    );
            fileNameArray.push(filename); 
        }
       
        console.log("product uploading");
        console.log(fileNameArray)
        let product = new Product({
          slug: args.slug,
          productName: args.productname,
          images: fileNameArray,
          price: args.price,
          description: args.description,
          stock: args.stock,
          numOfReviews: 0,
          averageRating: 0,
        });
        console.log('product')
        console.log(product);
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
        await Product.findOne(
          { productId: args.productId },
          function (err, obj) {
            product = obj;
          }
        );

        if (
          (typeof product === "undefined" || !product) &&
          mongoose.connection.readyState === 1
        ) {
          console.log(`${args.productId} not found`);

          product = new Product({
            productId: args.productId,
            productName: args.productName,
            numOfReviews: 1,
            averageRating: args.rating,
          });

          product.save();
        } else {
          console.log(!(typeof product === "undefined"));
          if (!(typeof product === "undefined")) {
            console.log(`${args.productId} found`);
            const rating =
              (1 * product.averageRating * product.numOfReviews +
                1 * args.rating) /
              (product.numOfReviews + 1);
            console.log(rating);
            console.log(product.numOfReviews + 1);
            const numOfReviews = product.numOfReviews + 1;
            await Product.updateOne(
              { productId: args.productId },
              {
                $set: {
                  numOfReviews: numOfReviews,
                  averageRating: `${rating}`,
                },
              }
            );
          }
        }

        return !error ? review.save() : null;
      },
    },

    // TODO: edits number of reviews and updates overall rating for that product
    // for deleteReview and edit Review
    deleteReview: {
      type: ProductType,
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
      type: ProductType,
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
    uploadFile: {
      type: ProductType,
      args: {
        file: { type: GraphQLUpload },
      },
      resolve: async (parent, args, context) => {
        console.log("upload");
        const { file } = args;
        const { createReadStream, filename } = await file;

        await new Promise((res) =>
          createReadStream()
            .pipe(
              projectImages.file(filename).createWriteStream({
                resumable: false,
                gzip: true,
              })
            )
            .on("finish", res)
        );

        files.push(filename);

        return null;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
