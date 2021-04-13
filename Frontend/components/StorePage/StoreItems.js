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
        margin: "0 auto",
        justifyContent: "center",
        padding: "0",
        height:'fit-content'
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
            height:'fit-content'
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
                      <div
                        style={{
                          display: "flex",
                          // justifyContent: "space-around",
                          maxWidth: "200px",
                          margin: "0 auto",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: "#e81c1c",
                            textDecoration: "line-through",
                          }}
                        >
                          £{(item.discountedFrom / 100).toFixed(2)}
                        </span>
                        <span>£{(item.price / 100).toFixed(2)}</span>
                      </div>
                    ) : (
                      <p style={{margin:'0'}}>£{(item.price / 100).toFixed(2)}</p>
                    )}
                  </div>
            </>
          )}

        </li>
      ))}
    </ul>
  );
};

export default StoreItems;
