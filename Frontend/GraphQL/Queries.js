import { gql } from "@apollo/client";

export const LOAD_REVIEWS = gql`
  query($productId: String!, $productName: String!) {
    getProduct(productId: $productId, productName: $productName) {
      productName
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
  query(
    $male: Boolean
    $female: Boolean
    $under50: Boolean
    $under100: Boolean
    $discounted: Boolean
  ) {
    getAllProducts(
      male: $male
      female: $female
      under50: $under50
      under100: $under100
      discounted: $discounted
    ){
      images
      productName
      _id
      slug
      price
      numOfReviews
      averageRating
      discounted
      discountedPrice
    }
  }
`

export const LOAD_ALL_CATEGORY_PRODUCTS = gql`
  query($category: String) {
    getAllProducts(category: $category){
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