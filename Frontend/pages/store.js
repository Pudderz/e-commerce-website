import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import Skeleton from "@material-ui/lab/Skeleton";
import { Breadcrumbs, Typography } from "@material-ui/core";
import hikingBackground from "../images/hikingBackground.jpg";
import { Filters } from "../components/StorePage/Filters";
import { ItemImage } from "../components/Common/ItemImage";
import Link from "next/link";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "../GraphQL/Queries";

export const StorePage = () => {
  const [products, setProducts] = useState(Array.from({ length: 12 }, () => 0));

  const [fetchProducts, { data, error, loading }] = useLazyQuery(
    LOAD_ALL_PRODUCTS
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();

  }, []);

  useEffect(() => {
console.log(data)

  }, [data]);

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "600px",
          width: "100%",
          // backgroundColor: "#CE1121",
          position: "relative",
        }}
      >
        {/* <img src={webBanner} alt="" height="100%"/> */}
        <img
          src={hikingBackground}
          alt=""
          height="100%"
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            width: "100%",
            objectFit: "cover",
            left: "0",
          }}
        />
      </div>
      <div style={{ padding: "20px " }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Typography>Store</Typography>
        </Breadcrumbs>
        <Filters />
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
          {data?.getAllProducts?.map((item, index) => (
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
                  <p style={{ margin: "auto" }}>
                    {item.price}
                  </p>
                </>
              )}

              {/* <a href={item.checkout_url.checkout}>Add to Basket</a> */}
            </li>
          ))}
        </ul>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export default StorePage;
