const graphql = require("graphql");
const Review = require("../../models/review");
const Product = require("../../models/products");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLFloat
} = graphql;

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});


const ProductReviews = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    _id: { type: GraphQLID },
    productId: { type: GraphQLString },
    productName: { type: GraphQLString },
    name: { type: GraphQLString },
    profileImage: { type: GraphQLString },
    rating: { type: GraphQLString },
    descriptionTitle: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});


const StockSize = new GraphQLObjectType({
  name: "stockSize",
  fields: ()=>({
    shoeSize: {type: GraphQLInt},
    stock: {type: GraphQLInt}
  })
})


const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    _id: { type: GraphQLID },
    // productId: { type: GraphQLString },
    productName: { type: GraphQLString },
    price: { type: GraphQLString },
    
    averageRating: { type: GraphQLString },
    description: { type: GraphQLString },
    stock: { type: new GraphQLList(StockSize) },
    images: { type: new GraphQLList(GraphQLString) },
    datePosted:{type: GraphQLInt },
    categories: {type: new GraphQLList(GraphQLString) },
    slug: { type: GraphQLString },
    discounted: {type: GraphQLBoolean},
    discountedPrice: {type: GraphQLString},
    gender: {type: new GraphQLList(GraphQLString) },
    male: {type: GraphQLBoolean},
    female: {type: GraphQLBoolean},
    numOfReviews: { 
      type: GraphQLInt ,
      resolve(parent, args){
        Review.find({productName: parent.productName}).exec((err, results)=>{
          if(err || results ==null) return 0;
          return results.length
        })
      }
    
    },
    allProductReviews: {
      type: new GraphQLList(ProductReviews),
      resolve(parent, args) {
        return Review.find({ productName: parent.productName });
      },
    },
  }),
});


const shippingDetails = new GraphQLObjectType({
  name: "ShippingDetails",
  fields:()=>({
    name: {type: GraphQLString},
    street: {type: GraphQLString},
    city: {type: GraphQLString},
    country: {type: GraphQLString},
    postalCode: {type: GraphQLString},
  })
})

const UserOrders = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    date: { type: dateScalar },
    price: { type: GraphQLInt },
    status: { type: GraphQLString },
    orderNotes: { type: GraphQLString },
    items: {type: new GraphQLList(GraphQLString)},
    allOrderItems: {
      type: new GraphQLList(ProductType),
      resolve(parent, args){
        return Product.find({_id: parent.items})
      }
    },
    shippingAddress: {
      type: shippingDetails,
    },
   
  }),
});

module.exports = { ProductType, ProductReviews, UserOrders };
