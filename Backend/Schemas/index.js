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
  ProductReviews,
  UserOrders,
} = require("./TypeDefs/UserType");
const isTokenValid = require("../Authentication/validate");
const Review = require("../models/review");
const Product = require("../models/products");
const Order = require("../models/order");
const { ObjectId } = require("mongodb");
const { GraphQLUpload } = require("graphql-upload");

const { projectImages } = require("../analytics/googleCloudBucket");
const { GraphQLFloat } = require("graphql");

const files = [];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
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
        console.log(args);
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
        return Order.find({}).sort({ date: "desc" });
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
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
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
              price: args.discounted
                ? args.discountedPrice * 1
                : args.price * 1,
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
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
