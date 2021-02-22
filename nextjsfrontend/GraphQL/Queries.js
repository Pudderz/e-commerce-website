import {gql} from '@apollo/client'

export const LOAD_REVIEWS = gql`
query($productId: String!, $productName: String!) {
    getProduct(productId: $productId, productName: $productName) {
      productId,
      numOfReviews,
      averageRating,
      allProductReviews {
        name,
        rating,
        descriptionTitle,
        description,
        profileImage
      }
    }
  }
  
`