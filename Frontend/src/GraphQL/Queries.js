import {gql} from '@apollo/client'

export const LOAD_REVIEWS = gql`
query {
    getAllProducts {
      productId,
      numOfReviews,
      averageRating,
      allProductReviews {
        id,
        name,
        rating,
        descriptionTitle,
        description,
        profileImage
      }
    }
  }
  
`