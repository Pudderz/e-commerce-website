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
