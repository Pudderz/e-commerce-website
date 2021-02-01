import {
  Breadcrumbs,
  Button,
  Paper,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductImages } from "../components/ProductImages";
import { ProductTabs } from "../components/ProductTabs";
import { RecentlyViewed } from "../components/RecentlyViewed";
import { commerce } from "../lib/commerce";
import { addToHistory } from "../lib/localStorage";
import { SnackbarProvider, useSnackbar } from "notistack";
import { RecentProducts } from "../components/RecentProducts";
import { ReviewProduct } from "../components/ReviewProduct";
import { CartContext } from "../context/CartContext";
import { SelectSize } from "../components/SelectSize";

export const ProductPage = () => {
  const [product, setProduct] = useState({});
  // const [cart, setCart] = useState({});
  const [currentTab, setCurrentTab] = useState(0);

  const { cart, changeCart } = useContext(CartContext);
  const { enqueueSnackbar } = useSnackbar();

  const fetchItem = (id) => {
    commerce.products
      .retrieve(id)
      .then((cart) => {
        setProduct(cart);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
  };

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        changeCart(cart);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
  };

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let id = params.get("id");
    fetchItem(id);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);

  useEffect(() => {
    fetchCart();

    return () => {
      addToHistory(product);
    };
  }, [product]);

  const handleAddToCart = (item, quantity = 1) => {
    commerce.cart
      .add(item.id, quantity)
      .then((item) => {
        changeCart(item.cart);
        enqueueSnackbar("Item added to the basket", { variant: "success" });
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
        enqueueSnackbar("Item could not be added to the basket", {
          variant: "error",
        });
      });
  };

  const handleTab = (tabNumber) => {
    setCurrentTab(tabNumber);
  };
  return (
    <div style={{ padding: "0 20px" }}>

      <div
        style={{
          display: "flex",
          margin: "auto",
          width: "fit-content",
          textAlign: "start",
          marginTop: "50px",
        }}
      >
        <div>
          {/* Product Images */}
          <ProductImages images={product.assets} />
        </div>
        <div>
          <div>
            <h1>{product.name}</h1>
            {/* +Review bar */}

            {/*     font-size: 16px;
    margin: 0; */}
            <h2>{product?.price?.formatted_with_symbol}</h2>
            <p style={{color:'green'}}>In Stock ({product.quantity} left)</p>
            
            <label htmlFor="sizes" style={{fontWeight:'bold'}}>Select size</label>
            <SelectSize availableSizes={[4,6, 8 ,9]}/>
            {/* <select
              name="sizes"
              id="sizes"
              style={{ width: "100%", height: "30px" }}
            >
              <option disabled>Select a size</option>
              <option value="5">UK 5</option>
              <option value="6">UK 6</option>
              <option value="7">UK 7</option>
              <option value="8">UK 8</option>
            </select> */}
            <a href="#!">Size Guide</a>
            {/* <p>Colours Available:</p> */}
            {/* Available sizes section */}
            {/* <input type="text" />
            <button>{"<"}</button>
            <button>{">"}</button> */}
<hr/>
            <Button
              onClick={() => handleAddToCart(product, 1)}
              variant="contained"
            >
              ADD TO BASKET
            </Button>
            <Button variant="contained">BUY NOW</Button>
          </div>

          {/* tabbed sections with information  */}
        </div>
      </div>

      {/* sticky header for when top section is not in view (intersection observer)
       */}

      <div
        style={{
          top: "0px",
          position: "sticky",
          height: "fit-content",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          zIndex: "2",
          margin: "0 -20px",
          padding: " 0",
          width: "81%",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: "1em" }}>
          <Link to="/">Home</Link>
          <Link to="/">Store</Link>
          <Typography>{product?.name}</Typography>
        </Breadcrumbs>

        <div style={{ display: "flex" }}>
          <img src={product?.assets?.[0]?.url} height="60px" alt="" />
          <h4 style={{ margin: "1em" }}>{product.name}</h4>
          <p>{product?.price?.formatted_with_symbol}</p>
        </div>

        <div
          style={{
            display: "flex",
            minWidth: "30%",
            width: "fit-content",
            justifyContent: "space-between",
          }}
        >
          <select
            name="sizes"
            id="sizes"
            style={{ margin: "1em", height: "30px" }}
          >
            <option disabled>Select a size</option>
            <option value="5">UK 5</option>
            <option value="6">UK 6</option>
            <option value="7">UK 7</option>
            <option value="8">UK 8</option>
          </select>

          <Button>Add to Basket</Button>
          <Button>Save</Button>
        </div>
      </div>
      <hr />
      <ProductTabs />
      <hr />
      <ReviewProduct />
      <RecentlyViewed />
    </div>
  );
};
