import { gql } from "@apollo/client";

export const addReview = gql`
  mutation(
    $productId: String!
    $name: String!
    $profileImage: String!
    $rating: String!
    $description: String!
    $descriptionTitle: String!
  ) {
    createReview(
      productId: $productId
      name: $name
      profileImage: $profileImage
      rating: $rating
      description: $description
      descriptionTitle: $descriptionTitle
    ){
      id
    }
  }
`;
