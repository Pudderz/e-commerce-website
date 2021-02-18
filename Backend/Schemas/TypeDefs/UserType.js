const graphql = require("graphql");
const Review = require("../../models/review");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = graphql;


const ProductReviews = new GraphQLObjectType({
  name: "Review",
  fields:()=>({
    id: { type: GraphQLInt },
    productId:{ type: GraphQLString },
    name: { type: GraphQLString },
    profileImage: { type: GraphQLString},
    rating: { type: GraphQLString },
    descriptionTitle:{type: GraphQLString},
    description:{type: GraphQLString}
  })
})


const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLInt },
    productId: { type: GraphQLString },
    productName: { type: GraphQLString },
    numOfReviews: { type: GraphQLInt },
    averageRating: { type: GraphQLString },
    allProductReviews: { 
      type: new GraphQLList(ProductReviews),
      resolve(parent, args){
        return Review.find({productId: parent.productId})
      }
    },
  }),
});

module.exports = {ProductType, ProductReviews};
