import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { GetReviews } from "./GetReviews";
import { WriteAReview } from "./WriteAReview";
import { useQuery } from "@apollo/client";
import { LOAD_REVIEWS } from "../../GraphQL/Queries";
export const ReviewProduct = ({ productId, productName }) => {
  const [showForm, setShowForm] = useState(false);

  const { data, refetch } = useQuery(LOAD_REVIEWS, {
    variables: { productId, productName },
  });

  const handleRefetch = () => {
    refetch();
  };

  const handleWriteReview = () => {
    setShowForm(true);
  };
 const handleClose = ()=>{
  setShowForm(false);
 }
  return (
    <div style={{ textAlign: "start", margin: "auto" }}>
      <h2>Customer Reviews</h2>

      <div>
        <hr />
        <h3>Review this product</h3>
        <p>Share your thoughts with other customers</p>
        <Button
          variant="contained"
          style={{ display: showForm ? "none" : "block" }}
          onClick={handleWriteReview}
        >
          Write a customer review
        </Button>
        <WriteAReview
          handleRefetch={handleRefetch}
          productId={productId}
          productName={productName}
          showForm={showForm}
          close={handleClose}
        />
      
      </div>

      {/* Will Add back when you can sort reviews  */}
      {/* <div>
        <select>
          <option value="top" key="top">
            Top reviews
          </option>
          <option value="recent" key="recent">
            Most recent
          </option>
        </select>
      </div> */}

      <h3>Reviews</h3>
      <GetReviews productId={productId} data={data} />
      {typeof data === "undefined" && (
        <p>There are no reviews for this item. Be the first to review it!</p>
      )}
    </div>
  );
};
