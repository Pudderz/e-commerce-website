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
      _id
      date
      price
      items
      status
      orderNotes
      shippingAddress{
        name
        street
        city
        country
        postalCode
      }
      allOrderItems{
        productName
        slug

      }
    }
  }
`;

export const LOAD_ALL_ORDERS = gql`
  query {
    getAllOrders {
      _id
      date
      price
      items
      status
      orderNotes
      shippingAddress{
        name
        street
        city
        country
        postalCode
      }
      allOrderItems{
        productName
        slug

      }
    }
  }
`;


export const LOAD_ALL_PRODUCTS = gql`
  query(
    $male: Boolean
    $female: Boolean
    $unisex: Boolean
    $under100: Boolean
    $between100And150: Boolean
    $over150: Boolean
    $discounted: Boolean
    $search: String
    $limit:Int
    $stockSize:[Float]
    $sortBy: String
    ) {
    getAllProducts(
      male: $male
      female: $female
      unisex: $unisex
      under100: $under100
      between100And150: $between100And150
      over150: $over150
      discounted: $discounted
      search: $search
      limit:$limit
      stockSize: $stockSize
      sortBy: $sortBy
    ){
      images
      productName
      _id
      slug
      price
      gender
      numOfReviews
      averageRating
      discounted
      discountedFrom
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
      stock{
        shoeSize
        stock
      }
      price
      numOfReviews
      averageRating
      description
      discounted
      discountedFrom
    }
  }
`