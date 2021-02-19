import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_REVIEWS } from "../../GraphQL/Queries";
import { Avatar } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export const GetReviews = ({ productId, data }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {data?.getProduct?.[0]?.numOfReviews && (
        <div>
          {data?.getProduct?.[0]?.numOfReviews} Review
          {data?.getProduct?.[0]?.numOfReviews > 1 && "s"}
        </div>
      )}
      {data?.getProduct?.[0]?.averageRating && (
        <div>Average Rating: {data?.getProduct?.[0]?.averageRating}/5</div>
      )}

      <ol style={{ listStyle: "none", padding: "0" }}>
        {data?.getProduct?.[0]?.allProductReviews.map((review, index) => (
          <li key={index} style={{ margin: "20px 0" }}>
            <div style={{ display: "flex" }}>
              <Avatar src={review?.profileImage} />
              <p
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                  margin: "auto 20px",
                }}
              >
                {review?.name}
              </p>
            </div>
            <div style={{ display: "flex" }}>
              {/* Review stars */}
              <Rating value={review?.rating} readOnly />
              <h4 style={{ margin: "5px 0" }}>{review?.descriptionTitle}</h4>
            </div>
            <div>
              <p style={{ margin: "5px 0" }}>
                Reviewed in the United Kingdom on 3 August 2018
              </p>
            </div>
            <div>
              <p>{review?.description}</p>
            </div>
            <div>
              <p>84 people found this helpful</p>
              <button>Helpful</button>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};
