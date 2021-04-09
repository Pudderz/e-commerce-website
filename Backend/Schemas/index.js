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
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { projectImages } = require("../analytics/googleCloudBucket");

const files = [];

// const gc = new Storage({
//   keyFilename: path.join(__dirname, "../key.json"),
//   projectId: "e-commerce-web-project",
// });

// // gc.getBuckets().then(x=>console.log(x));
// const projectImages = gc.bucket("e-commerce-image-storage-202");


const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      args: { 
        id: { type: GraphQLInt },
        category: {type: GraphQLString},
        male:{type: GraphQLBoolean},
        female:{type: GraphQLBoolean},
        under50:{type: GraphQLBoolean},
        under100:{type: GraphQLBoolean},
        discounted:{type: GraphQLBoolean},
        search: {type: GraphQLString},
        limit: {type: GraphQLInt},
        skip: {type: GraphQLInt},
    },
      resolve: async (parent, args, context) => {
        await context();

        let searchParameters = {};


        if(args.search){
          searchParameters.productName =  { $regex: args.search, $options: "i" };
        }

        if(args.male || args.female){
          const filterGender = [];
          if(args.male) filterGender.push("male");
          if(args.female) filterGender.push("female");
          if(filterGender.length === 1){
            searchParameters[gender] = filterGender;
          }
          
          

        }
        if(args.discounted){
          searchParameters.discounted = true;
        }
        if(typeof args.category !== "undefined"){
          searchParameters.categories = args.category;
        }

        if(args.limit){
          if(args.skip){
            return Product.find({...searchParameters}).sort({datePosted: 'desc'}).skip(args.skip).limit(args.limit);
          }
          return Product.find({...searchParameters}).sort({datePosted: 'desc'}).limit(args.limit);
        }
          return Product.find({...searchParameters}).sort({datePosted: 'desc'});
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
        console.log(args)
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
        return Order.find({}).sort({date: 'desc'});;
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
        categories: {type: new GraphQLList(GraphQLString)},
        male: {type: GraphQLBoolean},
        female: {type: GraphQLBoolean}
      },
      resolve: async (parent, args, context) => {
        const { db, token } = await context();
        // Tests if user is authenticated to create a review
        let { error } = await isTokenValid(token);
        if (error) return new Error("You do not have a valid token");
        
        // Checks if name already exists in mongoDB product collection
        await Product.find({productName: args.productname},(err, doc)=>{
          console.log('found product')
          console.log(doc.length);
          if(doc.length >0){
            console.log('doc is greater than 1')
            error = true;
          }
        });
        if (error) return new Error("The name you have choosen already exists");

        const { files } = args;
        console.log('uploading images')
        let fileNameArray = [];

        if(files.length < 2) return new Error("Must have 2 or more images");

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
       
        console.log('images uploaded')
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
          price: args.price,
          description: args.description,
          categories: args.categories,
          stock: stockContainer,
          datePosted: time,
          gender,
          averageRating: 0,
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
    updateProductImageOrder:{
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        images: { type: new GraphQLNonNull(GraphQLString)},
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
              images: args.images
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
    updateProductImages:{
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        images: { type: new GraphQLNonNull(GraphQLString)},
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
            { _id: ObjectId(args.id)},
            {
              images: args.images
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
    updateProductPrice:{
      type: ProductType,
    args: {
      id: { type: new GraphQLNonNull( GraphQLString)},
      price: { type: new GraphQLNonNull(GraphQLString) },
      discounted:{type: new GraphQLNonNull(GraphQLBoolean)},
      discountedPrice:{type: new GraphQLNonNull(GraphQLString)},
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
          { _id: id},
          {
            price: args.price,
            discounted: args.discounted,
            discountedPrice: args.discountedPrice,
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
    updateProductDescription:{
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
            { _id: ObjectId(args.id)},
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
