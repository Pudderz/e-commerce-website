import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

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

const EDIT_PRODUCT_STOCK = gql`
  mutation($stock: [Int!], $id: String!) {
    updateProductStock(stock: $stock, id: $id) {
      stock
    }
  }
`;

const EDIT_PRODUCT_IMAGE_ORDER = gql`
  mutation($images: [String!], $id: String!) {
    updateProductImageOrder(images: $images, id: $id) {
      images
    }
  }
`;

const EDIT_PRODUCT_IMAGES = gql`
  mutation($stock: [Int!], $id: String!) {
    updateProductStock(stock: $stock, id: $id) {
      stock
    }
  }
`;

const EDIT_PRODUCT_DESCRIPTION = gql`
mutation(
  $description: String!
  $id: String!
){
  updateProductDescription(description: $description, id: $id){
    stock
  }
}
`;

const EDIT_PRODUCT_PRICE = gql`
  mutation(
    $price: Int!
    $discounted: Boolean!
    $discountedPrice: Int!
    $id: String!
  ) {
    updateProductPrice(price: $price, id: $id, discounted: $discounted, discountedPrice: $discountedPrice) {
      productName
      price
      discounted
      discountedFrom
    }
  }
`;

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

   const [editStock, {data: stockData}] = useMutation(EDIT_PRODUCT_STOCK)
  // const [editImageOrder, {data: imageOrder}] = useMutation(EDIT_PRODUCT_IMAGE_ORDER)
  const [editDescription, {data: descriptionData}] = useMutation(EDIT_PRODUCT_DESCRIPTION)
  const [editPrice, {data: priceData}] = useMutation(EDIT_PRODUCT_PRICE)





  const [value, setValue] = useState(0);
  const [text, setText] = useState("");
  const [product, setProduct] = useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
 const [stockArray, setStockArray] = useState(
    Array.from({ length: ALL_SIZES.length }, () => 0)
  );


  useEffect(() => {
    setProduct(props.product);
    console.log(props.product);
    let array = [];
    props.product.stock.forEach(number=>{
      array.push(1*number)
    })
    setStockArray(array)
  }, [props]);

 

  const handleStockChange = (index, value) => {
    let newValue = 1*stockArray[index] + 1*value;
    stockArray[index] = newValue >= 0 ? newValue : 0;
    setStockArray([...stockArray]);
  };

  
  useEffect(() => {
    setText(props.product.description);
  }, []);


  //Price
 const {register: registerPrice, handleSubmit: handleSumbitPrice} = useForm()

 const onPriceSubmit = data =>{
   console.log(data);
   console.log
   editPrice({variables: {id:props.product.id, price: 100*data.productPrice, discounted: data.isDiscounted, discountedPrice: 100*data.discountedPrice}})
 }




//   //Description

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTextSubmit = ()=>{
    console.log('handleTextUpdate')
    editDescription({variables:{id: props.product.id, description: text }})
  }

  const handleStockUpdate = ()=>{
    console.log('handleTextUpdate')
    editStock({variables:{id: props.product.id, stock: stockArray }})
  }

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
        <div style={{ display: "flex", gap: "150px" }}>
          <p>Order</p>
          <p>Fullscreen Image</p>
        </div>
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
          <Button 
          onClick={handleTextSubmit}
          variant="contained" color="primary">
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
          <Button variant="contained" color="primary" onClick={handleStockUpdate}>
            Save Stock
          </Button>
        </form>
      </TabPanel>
      <TabPanel value={value} index={3}>
        
        <div>
          <form onSubmit={handleSumbitPrice(onPriceSubmit)}>
          <h3>Pricing</h3>
          <p>Current Price: £{(product.price/100).toFixed(2)}</p>
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
              step="0.01"
              inputRef={registerPrice}
              defaultValue={(product.discounted)?product.discountedFrom/100 : product.price/100}
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
              labelWidth={60}
              required
            />
          </FormControl>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignContent: "center",
            }}
          >
            <label
              htmlFor="outlined-adornment-amount"
              style={{ alignSelf: "center" }}
            >
              is Discounted:
            </label>
            <Switch defaultChecked={product.isDiscounted} label="is discounted" color="primary" name="isDiscounted" inputRef={registerPrice}></Switch>
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
              name="discountedPrice"
              label="Discounted price"
              inputRef={registerPrice}
              type="number"
              defaultValue={(product.discounted)? product.price/100 : product.discountedFrom/100 }
              startAdornment={
                <InputAdornment position="start">£</InputAdornment>
              }
              labelWidth={60}
              required
            />
          </FormControl>

          <Button>Reset Price</Button>
          <Button type="submit">Save new Price</Button>
          </form>
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
