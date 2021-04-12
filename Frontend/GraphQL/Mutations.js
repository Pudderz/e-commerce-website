import { gql } from "@apollo/client";

export const addReview = gql`
  mutation(
    $productId: String!
    $productName: String!
    $name: String!
    $profileImage: String!
    $rating: String!
    $description: String!
    $descriptionTitle: String!
  ) {
    createReview(
      productId: $productId
      productName: $productName
      name: $name
      profileImage: $profileImage
      rating: $rating
      description: $description
      descriptionTitle: $descriptionTitle
    ){
      productId
    }
  }
`;

export const CREATE_USER_ORDER = gql`
  mutation(
    $price: String!
  ) {
    createOrder(price: $price){
      price
      date
      subId
    }
  }
`


export const DELETE_USER_REVIEW = gql`
  mutation(
    $id: String!
    $sub: String!
  ) {
    deleteReview(id: $id, sub:$sub){
      productName
    }
  }
`

export const EDIT_USER_REVIEW = gql`
  mutation(
    $id: String!
    $title: String!
    $description:String!
    $rating: String!
  ) {
    editReview(id: $id, title: $title, description: $description, rating: $rating){
      productName
    }
  }
`



export const EDIT_PRODUCT_STOCK = gql`
  mutation($stock: [Int!], $id: String!) {
    updateProductStock(stock: $stock, id: $id) {
      stock
    }
  }
`;

export const EDIT_PRODUCT_IMAGE_ORDER = gql`
  mutation($images: [String!], $id: String!) {
    updateProductImageOrder(images: $images, id: $id) {
      images
    }
  }
`;

export const EDIT_PRODUCT_IMAGES = gql`
  mutation($stock: [Int!], $id: String!) {
    updateProductStock(stock: $stock, id: $id) {
      stock
    }
  }
`;

export const EDIT_PRODUCT_DESCRIPTION = gql`
mutation(
  $description: String!
  $id: String!
){
  updateProductDescription(description: $description, id: $id){
    stock
  }
}
`;

export const EDIT_PRODUCT_PRICE = gql`
  mutation(
    $price: Int!
    $discounted: Boolean!
    $discountedPrice: Int!
    $id: String!
  ) {
    updateProductPrice(price: $price, id: $id, discounted: $discounted, discountedPrice: $discountedPrice) {
      productName
      price
      discounted
      discountedFrom
    }
  }
`;