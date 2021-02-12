const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const ProductType =require('./TypeDefs/UserType')
const reviewData = require('../reviewDataExample.json');



const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return reviewData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createProduct: {
      type: ProductType,
      args: {
        productId: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve(parent, args) {
        reviewData.push({
          id: reviewData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
        });
        return args;
      },
    },
    createReview:{
      type: ProductType,
      args:{
        productId:{ type: GraphQLString },
        name:{ type: GraphQLString },
        profileImage:{ type: GraphQLString },
        rating:{ type: GraphQLString },
        descriptionTitle:{ type: GraphQLString },
        description:{ type: GraphQLString },
      },
      resolve(parent,args){
        let i = 0;
        let match = false;
        // for(product in reviewData){
        //   if(product.productId === args.productId){
        //     product.allProductReviews.push({
        //       id:product.allProductReviews.length+1,
        //       name:args.name,
        //       rating: args.rating,
        //       descriptionTitle:args.description,
        //       description: args.descriptionTitle,
        //     })
            
            
        //     reviewData[i].averageRating = (reviewData[i].averageRating*reviewData[i].numOfReviews+args.rating/(reviewData[i].numOfReviews+1))
        //     reviewData[i].numOfReviews ++;
        //     match = true;
        //     break;
        //   } 
        //   i++;
        // }
        // if(!match){
          reviewData[0].allProductReviews.push({
            id:reviewData[0].allProductReviews.length+1,
            name:args.name,
            rating: args.rating,
            descriptionTitle:args.description,
            description: args.descriptionTitle,
          })
        // }
        console.log(reviewData[0].averageRating ,reviewData[0].numOfReviews )
        console.log((1*reviewData[0].averageRating*reviewData[0].numOfReviews)+1*args.rating)
        console.log(((1*reviewData[0].averageRating*reviewData[0].numOfReviews)+1*args.rating)/(1*reviewData[0].numOfReviews+1))
        reviewData[0].averageRating = ((1*reviewData[0].averageRating*reviewData[0].numOfReviews)+1*args.rating)/(reviewData[0].numOfReviews+1)
            reviewData[0].numOfReviews= reviewData[0].allProductReviews.length;
            console.log('added review')
        return args;
      }
    }
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
