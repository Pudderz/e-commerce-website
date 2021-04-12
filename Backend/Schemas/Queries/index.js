const graphql = require("graphql");
const { GraphQLObjectType } = graphql;

const { orderQueries } = require("./orders");
const { productQueries } = require("./products");
const { reviewQueries } = require("./reviews");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...productQueries,
    ...orderQueries,
    ...reviewQueries,
  },
});

module.exports = { RootQuery };
