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
  ) {
    deleteReview(id: $id){
      productName
    }
  }
`