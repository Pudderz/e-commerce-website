import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
// import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import measureFoot from "../images/how-to-measure-shoes.png";
import { ReviewProduct } from "./ReviewProduct";
import { SizeGuide } from "./SizeGuide";
import { DeliveryAndReturns } from "./DeliveryAndReturns";

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

  const handleChange = (newValue) => {
    setValue(newValue);
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
        aria-label="full width tabs example"
      >
        <Tab label="Description"></Tab>
        <Tab label="Size Guide"></Tab>
        <Tab label="Delivery & Returns"></Tab>
        <Tab label="Reviews"></Tab>
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
