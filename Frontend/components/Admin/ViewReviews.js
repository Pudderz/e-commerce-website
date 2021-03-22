import React, { useEffect } from "react";
import { GetReviews } from "../Review/GetReviews";
import { useLazyQuery } from "@apollo/client";
import { LOAD_REVIEWS } from "../../GraphQL/Queries";

export const ViewReviews = ({ productId, productName, product }) => {

  const [getReviews, { data }] = useLazyQuery(LOAD_REVIEWS);

  useEffect(() => {
    console.log(productId, productName);
    getReviews({
      variables: { productId, productName },
    });
  }, [productId, productName]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div style={{ textAlign: "start", margin: "auto" }}>
      <h2>Customer Reviews</h2>

      <hr />

      <h3>Reviews</h3>
      <GetReviews productId={productId} data={data} />
      {typeof data === "undefined" && (
        <p>There are no reviews for this item. Be the first to review it!</p>
      )}
    </div>
  );
};

export default ViewReviews;