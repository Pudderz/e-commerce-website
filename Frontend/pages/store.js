import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import hikingBackground from "../images/hikingBackground.jpg";
import { Filters } from "../components/StorePage/Filters";
import { ItemImage } from "../components/Common/ItemImage";
import Link from "next/link";
import { useLazyQuery, useQuery } from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "../GraphQL/Queries";
import { SelectSize } from "../components/ProductPages/SelectSize";

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
    console.log(data);
  }, [data]);

  return (
    <div>
      {/* <div
        style={{
          backgroundColor: "grey",
          height: "600px",
          width: "100%",
          // backgroundColor: "#CE1121",
          position: "relative",
        }}
      > */}
      {/* <img src={webBanner} alt="" height="100%"/> */}
      {/* <img
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
        /> */}
      {/* </div> */}
      <div style={{ padding: "20px " }}>
        {/* <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Typography>Store</Typography>
        </Breadcrumbs>
        <Filters /> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Store</h3>
          <div style={{ display: "flex" }}>
            <Button>Hide Filters</Button>
            <Button>Sort By</Button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "300px", height: "100%" }}>

            <ul
              style={{ listStyle: "none", padding: "10px", textAlign: "start" }}
            >
              <li>
                <Button style={{ width: "100%" }}>Gender</Button>
                <hr/>
                {/* <Checkbox label="Male"></Checkbox>
                <Checkbox label="Female"></Checkbox> */}
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Female"
                />
              </li>

              <li>
                <Button style={{ width: "100%" }}>Shop By Price</Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Under £50"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Under £100"
                />
              </li>

              <li>
                <Button style={{ width: "100%"}}>On Sale</Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="discounted"
                      color="primary"
                    />
                  }
                  label="Discounted"
                />
              </li>

              <li>
                <Button style={{ width: "100%" }}>Size</Button>
                {/* <SelectSize availableSizes={[2,4,5]}></SelectSize> */}
              </li>
              <li>
                <Button style={{ width: "100%" }}>Colours</Button>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="green"
                      color="primary"
                    />
                  }
                  label="Green"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="red"
                      color="primary"
                    />
                  }
                  label="Green"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="blue"
                      color="primary"
                    />
                  }
                  label="blue"
                />
              </li>
            </ul>
            <Button variant="contained" color="primary">Submit</Button>
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
                    <h4 style={{ margin: "10px auto 0" }}>
                      {item.productName}
                    </h4>
                    <p>rating: {item.averageRating}/5</p>
                    <p style={{ margin: "auto" }}>{item.price}</p>
                  </>
                )}

                {/* <a href={item.checkout_url.checkout}>Add to Basket</a> */}
              </li>
            ))}
          </ul>
        </div>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export default StorePage;
