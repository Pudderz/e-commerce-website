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


export const LOAD_ALL_PRODUCTS = gql`
  query {
    getAllProducts{
      images
      productName
      _id
      slug
      price
      numOfReviews
      averageRating
    }
  }
`

export const LOAD_PRODUCT_BY_SLUG = gql`
  query(
    $slug: String!
  ) {
    getProductBySlug(slug: $slug){
      images
      productName
      _id
      slug
      stock
      price
      numOfReviews
      averageRating
      description
      discounted
      discountedPrice
    }
  }
`