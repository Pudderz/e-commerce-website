import { Avatar, Button } from "@material-ui/core";
import React from "react";
import { GetReviews } from "./GraphQl/GetReviews";
import { WriteAReview } from "./WriteAReview";
import { addReview } from "../GraphQL/Mutations";
import { useLazyQuery, useMutation } from "@apollo/client";
import {useQuery, gql} from '@apollo/client'
import { LOAD_REVIEWS } from '../GraphQL/Queries';
export const ReviewProduct = ({ productId }) => {
  const { error, loading, data, refetch } = useQuery(LOAD_REVIEWS);

  const handleRefetch = () => {
    refetch();
  };
  return (
    <div style={{ textAlign: "start", margin: "auto" }}>
      <h2>Customer Reviews</h2>

      <div>
        <hr />
        <h3>Review this product</h3>
        <p>Share your thoughts with other customers</p>
        <Button variant="contained">Write a customer review</Button>
        <WriteAReview handleRefetch={handleRefetch} />
        <hr />
      </div>

      <div>
        <select>
          <option value="top" key="top">
            Top reviews
          </option>
          <option value="recent" key="recent">
            Most recent
          </option>
        </select>
      </div>

      <h3>Top reviews</h3>
      <GetReviews productId={productId} data={data} />

      <p>There are no reviews for this item. Be the first to review it!</p>
      
    </div>
  );
};
