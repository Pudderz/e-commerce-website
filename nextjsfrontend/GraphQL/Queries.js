import { gql } from "@apollo/client";

export const LOAD_REVIEWS = gql`
  query($productId: String!, $productName: String!) {
    getProduct(productId: $productId, productName: $productName) {
      productId
      numOfReviews
      averageRating
      allProductReviews {
        name
        rating
        descriptionTitle
        description
        profileImage
      }
    }
  }
`;

export const LOAD_USER_REVIEWS = gql`
  query {
    getUserReviews {
      _id
      productId
      name
      rating
      profileImage
      productName
      descriptionTitle
      description
    }
  }
`;

export const LOAD_USER_ORDERS = gql`
  query {
    getUserOrders {
      id
      date
      price
    }
  }
`;
