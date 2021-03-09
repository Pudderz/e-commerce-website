import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { GetReviews } from "./GetReviews";
import { WriteAReview } from "./WriteAReview";
import { useLazyQuery } from "@apollo/client";
import { LOAD_REVIEWS } from "../../GraphQL/Queries";
export const ReviewProduct = ({ productId, productName, product }) => {
  const [showForm, setShowForm] = useState(false);

  const [getReviews, { data}] = useLazyQuery(LOAD_REVIEWS, );

  const handleRefetch = () => {
    getReviews({
      variables: { productId, productName },
    });
  };

  const handleWriteReview = () => {
    setShowForm(true);
  };
 const handleClose = ()=>{
  setShowForm(false);
 }
 useEffect(() => {
   console.log(productId, productName);
  getReviews({
    variables: { productId, productName },
  })
 }, [productId, productName ]);

useEffect(() => {
  console.log(product);
}, [product])

// useEffect(() => {
//   // 
// }, [props])
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
