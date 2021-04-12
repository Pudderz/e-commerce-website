const graphql = require("graphql");
const {
  GraphQLObjectType,
} = graphql;

const { orderMutation } = require("./orders");
const { reviewMutations } = require("./reviews");
const { productMutations } = require("./products");


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...orderMutation,
    ...reviewMutations,
    ...productMutations
  },
});

module.exports = { Mutation };
