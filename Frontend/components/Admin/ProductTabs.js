import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ReviewProduct } from "../Review/ReviewProduct";
import { SizeGuide } from "../ProductPages/SizeGuide";
import { DeliveryAndReturns } from "../ProductPages/DeliveryAndReturns";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import { createDOMPurify } from "dompurify";
import { ChangeStock } from "./ChangeStock";

import ReactMarkdown from "react-markdown";
import { ProductImages } from "./ProductImages";
import ViewReviews from "./ViewReviews";

const ALL_SIZES = [
  3.5,
  4,
  4.5,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const ProductTabs = (props) => {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  const [product, setProduct] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  useEffect(() => {
    setProduct(props.product);
    console.log(props.product);
  }, [props]);

  const [stockArray, setStockArray] = useState(
    Array.from({ length: ALL_SIZES.length }, () => 0)
  );

  // useEffect(() => {
  //   fetchItem(props?.id, setProduct);
  // }, [props]);

  const handleStockChange = (index, value) => {
    let newValue = stockArray[index] + value;
    stockArray[index] = newValue >= 0 ? newValue : 0;
    setStockArray([...stockArray]);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    setText(props.product.description);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        textAlign: "initial",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        // variant="fullWidth"
        aria-label="full width tabs of products information"
        style={{ overflow: "auto" }}
      >
        <Tab value={0} label="Images"></Tab>
        <Tab value={1} label="Description"></Tab>
        <Tab value={2} label="Stock"></Tab>
        <Tab value={3} label="Pricing"></Tab>
        <Tab value={4} label="Reviews"></Tab>
      </Tabs>

      <TabPanel value={value} index={0}>
        <ProductImages images={props.product.images} />
        <Button variant="contained" color="secondary">
            Add Image
          </Button>
          <Button variant="contained" color="primary">
            Change order
          </Button>

      </TabPanel>

      <TabPanel value={value} index={1}>
        <div>
          <h2>{product?.name}</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button>editor</button>
            <button>preview</button>
          </div>
          <ReactMarkdown children={text} />
          <textarea
            style={{ resize: "vertical", width: "100%", minHeight: "200px" }}
            value={text}
            onChange={handleTextChange}
          ></textarea>

          <Button variant="contained" color="secondary">
            Reset Description
          </Button>
          <Button variant="contained" color="primary">
            Update Description
          </Button>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <form>
          <ChangeStock
            availableSizes={[4]}
            stockArray={stockArray}
            changeStock={handleStockChange}
          />
          <hr />
          <Button variant="contained" color="primary">
            Save Stock
          </Button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div>
          <h3>Pricing</h3>
          <p>Current Price: £{product.price}</p>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ margin: "10px 0" }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Standard Price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              name="productPrice"
              label="standard price"
              // value={values.amount}
              // onChange={handleChange('amount')}
              type="number"
              value={product.price}
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
              labelWidth={60}
              required
            />
          </FormControl>
          <div style={{display:'flex', justifyContent:'start', alignContent:'center'}}>
            <label htmlFor="outlined-adornment-amount" style={{alignSelf: 'center'}}>
              is Discounted:
            </label>
             <Switch label="is discounted" color="primary"></Switch>
          </div>
          
         
          <FormControl
            fullWidth
            variant="outlined"
            style={{ margin: "10px 0" }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">
              Discounted price
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              name="productPrice"
              label="Discounted price"
              // value={values.amount}
              // onChange={handleChange('amount')}
              type="number"
              value={product.price}
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
              labelWidth={60}
              required
            />
          </FormControl>

          <Button>Reset Price</Button>
          <Button>Save new Price</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ViewReviews
          product={product}
          productId={product?.id}
          productName={product?.name}
        />
        
      </TabPanel>
    </div>
  );
};
