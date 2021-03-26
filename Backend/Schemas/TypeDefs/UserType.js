const graphql = require("graphql");
const Review = require("../../models/review");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} = graphql;

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

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    _id: { type: GraphQLID },
    // productId: { type: GraphQLString },
    productName: { type: GraphQLString },
    price: { type: GraphQLString },
    
    averageRating: { type: GraphQLString },
    description: { type: GraphQLString },
    stock: { type: new GraphQLList(GraphQLString) },
    images: { type: new GraphQLList(GraphQLString) },
    datePosted:{type: GraphQLInt },
    categories: {type: new GraphQLList(GraphQLString) },
    slug: { type: GraphQLString },
    discounted: {type: GraphQLBoolean},
    discountedPrice: {type: GraphQLString},
    male: {type: GraphQLBoolean},
    female: {type: GraphQLBoolean},
    numOfReviews: { 
      type: GraphQLInt ,
      resolve(parent, args){
        Review.find({productName: parent.productId}).exec((err, results)=>{
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


const UserOrders = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    price: { type: GraphQLString },
  }),
});

module.exports = { ProductType, ProductReviews, UserOrders };
