const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql;

const ProductReviews = new GraphQLObjectType({
    name: "Review",
    fields: () => ({
      _id: { type: GraphQLID },
      productId: { type: GraphQLID },
      productName: { type: GraphQLString },
      name: { type: GraphQLString },
      profileImage: { type: GraphQLString },
      rating: { type: GraphQLInt },
      descriptionTitle: { type: GraphQLString },
      description: { type: GraphQLString },
    }),
  });


  module.exports = {ProductReviews};