const graphql = require("graphql");
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
    numOfReviews: { type: GraphQLInt },
    averageRating: { type: GraphQLString },
    allProductReviews: { 
      type: new GraphQLList(ProductReviews),
      // args: { id: { type: GraphQLInt } },
      // resolve(parent, args) {
      //   return userData;
      // }, 
    },
  }),
});

module.exports = ProductType;
