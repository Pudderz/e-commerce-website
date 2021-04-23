import React from "react";
import { ItemImage } from "./ItemImage";
import Skeleton from "@material-ui/lab/Skeleton";
import styled from "styled-components";

const ListItemWrapper = styled.li`
  width: 24%;
  min-width: 150px;
  box-sizing: border-box;
  max-width: 300px;
  box-sizing: border-box;
  flex-grow: 1;
`;


const DiscountedContainer = styled.div`
  display: flex;
  max-width: 200px;
  margin: 0 auto;
  gap: 10px;
  span:nth-child(1){
    color: #e81c1c;
    text-decoration: line-through;
  }
`;

export const Item = ({ item }) => {
  return (
    <ListItemWrapper>
      {typeof item !== "object" ? (
        <>
          <div
            style={{
              maxWidth: "200px",
              minWidth: "150px",
              flexGrow: "1",
            }}
          >
            <Skeleton
              variant="rect"
              width={200}
              style={{
                margin: "0px auto",
                maxWidth: "200px",
                minWidth: "150px",
                width: "100%",
                paddingBottom: "100%",
              }}
            ></Skeleton>
            <Skeleton
              variant="rect"
              height={25}
              width={200}
              style={{
                margin: "13px auto",
                maxWidth: "200px",
                minWidth: "150px",
                width: "100%",
              }}
            ></Skeleton>
          </div>
        </>
      ) : (
        <>
          <ItemImage
            id={item.id || item._id}
            name={item.name || item.productName}
            firstImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[0]}`}
            secondImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[1]}`}
            link={item.permalink || item.slug}
          />
          <div
            style={{
              margin: "auto",
              width: "200px",
              textAlign: "start",
            }}
          >
            <h4 style={{ margin: "0px", fontWeight: "500" }}>
              {item.name || item.productName}
            </h4>
            {item.discounted ? (
              <DiscountedContainer>
                <span>
                  £{(item.discountedFrom / 100).toFixed(2)}{" "}
                </span>
                <span>£{(item.price / 100).toFixed(2)}</span>
              </DiscountedContainer >
            ) : (
              <p style={{ margin: "0" }}>£{(item.price / 100).toFixed(2)}</p>
            )}
          </div>
        </>
      )}
    </ListItemWrapper>
  );
};

export default Item;
