import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
import { RecentlyViewed } from "../components/RecentlyViewed";
import Skeleton from "@material-ui/lab/Skeleton";
import { Breadcrumbs, Typography } from "@material-ui/core";
import runningBackground from "../images/runningBackground.jpg";
import hikingBackground from "../images/hikingBackground2.jpg";
import casualBackground from "../images/casualBackground2.jpg";
import { ItemImage } from "../components/ItemImage";

export const CategoryPage = (props) => {
  const [categoryInfo, setCategoryInfo] = useState({});
  const [category, setCategory] = useState("");

  const getCategoryInfo = (category) => {
    commerce.categories
      .retrieve(category, { type: "slug" })
      .then((category) => {
        console.log(category);
        setCategoryInfo(category);
      });
  };

  const [products, setProducts] = useState(
    Array.from({ length: 12 }, (v, i) => i)
  );

  const fetchProducts = (category) => {
    commerce.products
      .list({
        category_slug: category,
      })
      .then((item) => {
        setProducts((items) => item.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let category = params.get("category");
    setCategory(category);
    fetchProducts(category);
    getCategoryInfo(category);
    return () => {};
  }, []);

  useEffect(() => {
    console.log(products);
    return () => {};
  }, [products]);

  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "300px",
          width: "100%",
          // backgroundColor: "#CE1121",
          position: "relative",
        }}
      >
        {category === "running" && (
          <img
            src={runningBackground}
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
        )}
        {category === "hiking" && (
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
        )}
        {category === "casual" && (
          <img
            src={casualBackground}
            alt=""
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              width: "100%",
              objectFit: "cover",
              left: "0",
              objectPosition: "75% 65%",
            }}
          />
        )}
      </div>
      <div style={{ padding: "20px 20px 0" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Typography>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
        </Breadcrumbs>

        <div>
          <h2>
            {categoryInfo?.name}({categoryInfo?.products})
          </h2>
          <p style={{ maxWidth: "600px", margin: " 0 auto 20px" }}>
            {categoryInfo?.description}
          </p>
          <hr />
        </div>

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
          {products?.map((item, index) => (
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
                  <Typography variant="h4">
                    <Skeleton style={{ margin: "11px auto" }} />
                  </Typography>
                  <Skeleton
                    variant="rect"
                    height={300}
                    width={225}
                    style={{
                      margin: "0px auto",
                      maxWidth: "100%",
                      maxHeight: "20vh",
                    }}
                  ></Skeleton>
                  <div></div>

                  <Skeleton
                    height={25}
                    style={{ margin: "20px auto 0" }}
                  ></Skeleton>
                  <Skeleton
                    height={25}
                    style={{ margin: "10px auto 0" }}
                  ></Skeleton>
                </>
              ) : (
                <>
                  <ItemImage
                    id={item.id}
                    name={item.name}
                    firstImage={item.media.source}
                    secondImage={item.assets[1].url}
                  />
                  {/* <Link
                    to={{
                      pathname: "/product",
                      search: `?id=${item.id}`,
                    }}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={item.media.source}
                      alt={item.name}
                      style={{ maxWidth: "100%", maxHeight: "300px", zIndex:'1', position:'relative' }}
                    />
                    <img
                   
                      src={item.assets[1].url}
                      alt={item.name}
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                      style={{
                        position: "absolute",
                        maxWidth: "100%",
                        left: "0",
                        zIndex:(hover)?'2':'0'
                      }}
                    />
                  </Link> */}
                  <h4 style={{ margin: "10px auto 0" }}>{item.name}</h4>
                  <p style={{ margin: "auto" }}>
                    {item.price.formatted_with_symbol}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>

        <RecentlyViewed />
      </div>
    </div>
  );
};
