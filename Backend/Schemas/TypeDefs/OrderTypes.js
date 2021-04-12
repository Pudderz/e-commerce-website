const graphql = require("graphql");
const Product = require("../../models/products");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,

} = graphql;

const { GraphQLScalarType, Kind } = require('graphql');
const { ProductType } = require("./ProductType");

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

module.exports = { UserOrders };
