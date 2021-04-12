const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
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


  module.exports = {ProductReviews};