const graphql = require("graphql");
const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;
const { ProductType } = require("../TypeDefs/ProductType");
const isTokenValid = require("../../Authentication/validate");
const Review = require("../../models/review");
const Product = require("../../models/products");
const { ObjectId } = require("mongodb");
const { GraphQLUpload } = require("graphql-upload");

const { projectImages } = require("../../analytics/googleCloudBucket");

const productMutations = {
  createProduct: {
    type: ProductType,
    args: {
      productname: { type: GraphQLString },
      slug: { type: GraphQLString },
      price: { type: GraphQLInt },
      description: { type: GraphQLString },
      files: { type: new GraphQLList(GraphQLUpload) },
      stock: { type: new GraphQLList(GraphQLInt) },
      categories: { type: new GraphQLList(GraphQLString) },
      gender: { type: GraphQLString },
    },
    resolve: async (parent, args, context) => {
      const { db, token } = await context();
      // Tests if user is authenticated to create a review
      let { error } = await isTokenValid(token);
      if (error) return new Error("You do not have a valid token");

      // Checks if name already exists in mongoDB product collection
      const productCheck = await Product.find({
        productName: args.productname,
      });
      console.log(productCheck.length);
      if (productCheck.length > 0)
        return new Error("The name you have choosen already exists");

      const { files } = args;
      console.log("uploading images");
      let fileNameArray = [];

      if (files.length < 2) return new Error("Must have 2 or more images");

      // appends slug based on gender
      let slug = encodeURIComponent(args.productname);
      if (args.gender === "female") {
        slug = "f/" + slug;
      } else if (args.gender === "male") {
        slug = "m/" + slug;
      } else if (args.gender == "unisex") {
        slug = "u/" + slug;
      } else {
        return new Error("Please provide a valid gender");
      }

      for (let img of files) {
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

      console.log("images uploaded");
      console.log(fileNameArray);
      console.log("Uploading product");
      const time = new Date().getTime();

      console.log(`slug - ${slug}`);
      const stockContainer = [];

      args.stock.forEach((shoeSizeStock, index) => {
        if (Number(shoeSizeStock)) {
          let shoeSize = 3.5 + index * 0.5;
          const container = {
            shoeSize: Math.floor(Number(shoeSize) * 10),
            stock: Math.floor(Number(shoeSizeStock)),
          };
          stockContainer.push(container);
        }
      });

      console.log(stockContainer);

      let product = new Product({
        slug,
        productName: args.productname,
        images: fileNameArray,
        price: args.price * 100,
        description: args.description,
        categories: args.categories,
        stock: stockContainer,
        datePosted: time,
        gender: args.gender,
        averageRating: 0,
        discounted: false,
        discountedFrom: args.price * 100,
      });

      return product.save();
    },
  },
  updateProductStock: {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      stock: { type: new GraphQLList(GraphQLInt) },
    },
    resolve: async (parent, args, context) => {
      console.log("updating stock");
      console.log(args);
      const { db, token, subId } = await context();
      //Test if JWT is valid
      const { error } = await isTokenValid(token);
      if (error) return null;
      if (!subId) return null;

      try {
        return await Product.findOneAndUpdate(
          { _id: ObjectId(args.id) },
          {
            stock: args.stock,
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
  updateProductImageOrder: {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      images: { type: new GraphQLNonNull(GraphQLString) },
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
        return await Product.findOneAndUpdate(
          { _id: ObjectId(args.id), subId: subId },
          {
            images: args.images,
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
  updateProductImages: {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      images: { type: new GraphQLNonNull(GraphQLString) },
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
          { _id: ObjectId(args.id) },
          {
            images: args.images,
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
  updateProductPrice: {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      price: { type: new GraphQLNonNull(GraphQLInt) },
      discounted: { type: new GraphQLNonNull(GraphQLBoolean) },
      discountedPrice: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (parent, args, context) => {
      console.log("updating product price");
      console.log(args);
      const { db, token, subId } = await context();
      //Test if JWT is valid
      const { error } = await isTokenValid(token);
      if (error) return null;
      if (!subId) return null;

      let id = ObjectId(args.id);

      try {
        return await Product.findOneAndUpdate(
          { _id: id },
          {
            price: args.discounted ? args.discountedPrice * 1 : args.price * 1,
            discounted: args.discounted,
            discountedFrom: args.price * 1,
          },
          { new: true, useFindAndModify: false },
          (err, doc) => {
            console.log(`doc - ${doc}`);
            if (err) {
              console.log("Something wrong when updating data!");
              return null;
            }
          }
        );
      } catch (err) {
        console.log("error" + err);
        return null;
      }
    },
  },
  updateProductDescription: {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (parent, args, context) => {
      console.log("updating product description");
      console.log(args);
      const { db, token, subId } = await context();
      //Test if JWT is valid
      const { error } = await isTokenValid(token);
      if (error) return null;
      if (!subId) return null;

      try {
        return await Product.findOneAndUpdate(
          { _id: ObjectId(args.id) },
          {
            description: args.description,
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

module.exports = { productMutations };
