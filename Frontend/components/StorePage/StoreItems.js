import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { ItemImage } from "../Common/ItemImage";

export const StoreItems = ({ items }) => {
  return (
    <ul
      style={{
        display: "flex",
        flexFlow: "wrap",
        listStyle: "none",
        gap: "20px",
        margin: "auto",
        justifyContent: "center",
        padding: "0",
      }}
    >
      {items?.map((item, index) => (
        <li
          key={index}
          style={{
            width: "24%",
            minWidth: "150px",
            flexGrow: "1",
            maxWidth: "300px",
            boxSizing: "border-box",
          }}
        >
          {typeof item !== "object" ? (
            <>
              <Skeleton
                variant="rect"
                height={200}
                width={200}
                style={{
                  margin: "0px auto",
                  maxWidth: "100%",
                  maxHeight: "20vh",
                }}
              ></Skeleton>

              <Skeleton
                height={50}
                width={150}
                style={{ margin: "0px auto 0" }}
              ></Skeleton>
            </>
          ) : (
            <>
              <ItemImage
                id={item._id}
                name={item.productName}
                firstImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item?.images[0]}`}
                secondImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item?.images[1]}`}
                link={item.slug}
              />
              <h4 style={{ margin: "10px auto 0" }}>{item.productName}</h4>
              <p>rating: {item.averageRating}/5</p>

              {item.discounted ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    maxWidth: "200px",
                    margin: "0 auto",
                  }}
                >
                  <span
                    style={{ color: "#e81c1c", textDecoration: "line-through" }}
                  >
                    £{item.price}
                  </span>
                  <span>£{item.discountedPrice}</span>
                </div>
              ) : (
                <p>£{item.price}</p>
              )}
            </>
          )}

        </li>
      ))}
    </ul>
  );
};

export default StoreItems;
