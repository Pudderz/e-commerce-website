import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { ReviewProduct } from "../Review/ReviewProduct";
import { SizeGuide } from "./SizeGuide";
import { DeliveryAndReturns } from "./DeliveryAndReturns";
import { Tab, Tabs } from "@material-ui/core";

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

export const ProductTabs = ({ product }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };


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
          variant="fullWidth"
        aria-label="full width tabs of products information"
      >
        <Tab value={0} label="Description"></Tab>
        <Tab value={1} label="Size Guide"></Tab>
        <Tab value={2} label="Delivery & Returns"></Tab>
        <Tab value={3} label="Reviews"></Tab>
      </Tabs>

        <TabPanel value={value} index={0}>
          <div>
            <h2>{product?.name}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <SizeGuide/>
        </TabPanel>
        <TabPanel value={value} index={2}>
         <DeliveryAndReturns/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReviewProduct productId={product?.id} productName={product?.name} />
        </TabPanel>
    </div>
  );
};
