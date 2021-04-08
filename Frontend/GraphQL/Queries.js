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
    $under50: Boolean
    $under100: Boolean
    $discounted: Boolean
    $search: String
    $limit:Int
    ) {
    getAllProducts(
      male: $male
      female: $female
      under50: $under50
      under100: $under100
      discounted: $discounted
      search: $search
      limit:$limit
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