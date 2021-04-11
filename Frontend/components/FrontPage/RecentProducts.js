import React, { useState, useEffect, useContext, useRef } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, Typography } from "@material-ui/core";
// import hikingBackground from "../images/hikingBackground.jpg";
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ItemImage } from "../Common/ItemImage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useLazyQuery } from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "../../GraphQL/Queries";

export const RecentProducts = ({variables, header}) => {
  const [products, setProducts] = useState(Array.from({ length: 8 }, () => 0));
  // let {data} = useQuery(LOAD_ALL_PRODUCTS, {limit:8});
  const [fetchProducts, { loading, error, data }] = useLazyQuery(LOAD_ALL_PRODUCTS);

  const container = useRef();
  const isMin = useRef(false);
  useEffect(() => {
    fetchProducts({variables: {limit: 8, ...variables}})
  }, [])

  useEffect(() => {
    console.log(data)
    if(typeof data !== "undefined"){
      setProducts(data.getAllProducts)
    }
    
  }, [data])

  const handleMinimize = () => {
    container.current.style.height = isMin.current ? "fit-content" : "0px";
    isMin.current = !isMin.current;
  };

  useEffect(() => {
    console.log(products);
    return () => {};
  }, [products]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ textAlign: "start", marginLeft: "20px" }}>{header || "Newest"}</h3>
        <Button onClick={handleMinimize}>
          <ExpandMoreIcon />
          <ExpandLessIcon />
        </Button>
      </div>

      <hr />
      <div
        ref={container}
        style={{ overflow: "hidden", height: "fit-content" }}
      >
        <ul
          style={{
            display: "flex",
            flexFlow: "wrap",
            listStyle: "none",
            gap: "20px",
            margin: "auto",
            padding: "20px",
            boxSizing: "border-box",
            justifyContent: "center",
          }}
        >
          {products.map((item, index) => (
            <li
              key={index}
              style={{
                width: "24%",
                minWidth: "150px",
                maxWidth: "300px",
                boxSizing: "border-box",
                flexGrow: "1",
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
                    style={{ margin: "0px auto" }}
                  ></Skeleton>

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
                     id={item.id || item._id}
                     name={item.name || item.productName}
                     firstImage={item?.media?.source || `${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[0]}`}
                     secondImage={item.assets?.[1]?.url || `${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[1]}`}
                     link={item.permalink || item.slug}
                  />
                  <div style={{ margin: "auto", width: "200px", textAlign:'start' }}>
                    <h4 style={{ margin: "0px", fontWeight:'500' }}>{item.name || item.productName}</h4>
                    {/* <p style={{ margin: "auto" }}>
                      £{(item.price/100).toFixed(2)}
                    </p> */}
                    {item.discounted ? (
                <div
                  style={{
                    display: "flex",
                    // justifyContent: "space-around",
                    maxWidth: "200px",
                    margin: "0 auto",
                    gap:'10px'
                  }}
                >
                  <span
                    style={{ color: "#e81c1c", textDecoration: "line-through" }}
                  >
                    £{(item.discountedFrom/100).toFixed(2)}
                  </span>
                  <span>£{(item.price/100).toFixed(2)}</span>
                </div>
              ) : (
                <p style={{margin:'0'}}>£{(item.price/100).toFixed(2)}</p>
              )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
