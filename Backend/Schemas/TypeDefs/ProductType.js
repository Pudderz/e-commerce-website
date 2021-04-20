const graphql = require("graphql");
const Review = require("../../models/review");
const { ProductReviews } = require("./ReviewType");

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
} = graphql;


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
    productName: { type: GraphQLString },
    price: { type: GraphQLInt },
    description: { type: GraphQLString },
    stock: { type: new GraphQLList(StockSize) },
    images: { type: new GraphQLList(GraphQLString) },
    datePosted:{type: GraphQLInt },
    categories: {type: new GraphQLList(GraphQLString) },
    slug: { type: GraphQLString },
    discounted: {type: GraphQLBoolean},
    discountedFrom: {type: GraphQLInt},
    gender: {type: GraphQLString },
    sold: {type: GraphQLInt},
    numOfReviews: { 
      type: GraphQLInt ,
      resolve(parent, args){
       return Review.find({productName: parent.productName}).count();
      }
    
    },
    averageRating: { 
      type: GraphQLInt ,
      resolve(parent, args){
        return Review.aggregate([{
          $match:{ productName: parent.productName, rating: {$gte:0, $lte:5}},
        },{
          $group:{
            _id:null,
            averageReview: { $avg: "$rating" }
          }
        }
      ])
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




module.exports = { ProductType };
