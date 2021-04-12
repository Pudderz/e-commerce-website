const graphql = require("graphql");
const { GraphQLString, GraphQLList, GraphQLID } = graphql;
const { UserOrders } = require("../TypeDefs/OrderTypes");
const isTokenValid = require("../../Authentication/validate");
const Order = require("../../models/order");

const orderQueries = {
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
      return Order.find({}).sort({ date: "desc" });
    },
  },
};

module.exports = { orderQueries };
