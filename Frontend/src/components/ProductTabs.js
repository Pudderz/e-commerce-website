import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import measureFoot from '../images/how-to-measure-shoes.png'
import { ReviewProduct } from "./ReviewProduct";


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

export const ProductTabs = ({product}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
      {/* <AppBar> */}
      <Tabs
        value={value}
        onChange={handleChange}
        //   variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Description"></Tab>
        <Tab label="Size Guide"></Tab>
        <Tab label="Delivery & Returns"></Tab>
        <Tab label="Reviews"></Tab>
      </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <div>
            <h2>{product?.name}</h2>
            <div dangerouslySetInnerHTML={{__html:product?.description}}></div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h3>Size Guide</h3>

          {/* TODO Add Keys */}
          <table style={{width:'100%'}}>
            <tbody>
                <tr>
              <th>UK</th>
              <td>6</td>
              <td>6.5</td>
              <td>7</td>
              <td>7.5</td>
              <td>8</td>
              <td>8.5</td>
              <td>9</td>
              <td>9.5</td>
              <td>10</td>
              <td>10.5</td>
              <td>11</td>
              <td>11.5</td>
              <td>12</td>
              <td>13</td>
              <td>14</td>
            </tr>
            <tr>
              <th>EU</th>
              <td>40</td>
              <td>40.5</td>
              <td>41</td>
              <td>42</td>
              <td>42.5</td>
              <td>43</td>
              <td>44</td>
              <td>44.5</td>
              <td>45</td>
              <td>45.5</td>
              <td>46</td>
              <td>47</td>
              <td>47.5</td>
              <td>48.5</td>
              <td> - </td>
            </tr>
            <tr>
              <th>US</th>
              <td>7</td>
              <td>7.5</td>
              <td>8</td>
              <td>8.5</td>
              <td>9</td>
              <td>9.5</td>
              <td>10</td>
              <td>10.5</td>
              <td>11</td>
              <td>11.5</td>
              <td>12</td>
              <td>12.5</td>
              <td>13</td>
              <td>14</td>
              <td> - </td>
            </tr>
            </tbody>
          
          </table>
          <h3>HOW TO MEASURE</h3>

          {/* Section designed from adidas size guidance */}
          <p>Follow these steps to get the right size.</p>

          <div style={{display:'flex', padding:'20px', backgroundColor:'#ebedee'}}>
              <div style={{width:'50%', margin:'20px'}}>
                <ol style={{padding:'0'}}>
                  <li>
                    <p>Step on a piece of paper with your heel slightly touching a wall behind</p>
                  </li>
                  <li>
                    <p>Mark the end of your longest toe on the paper (you might need a friend to help you) and measure from the wall to the marking.</p>
                  </li>
                  <li>
                    <p>Do the same for the other foot and compare measurements with your size chart to get the right size</p>
                  </li>
                </ol>
              </div>
              <div style={{width:'50%', height:'fit-content',}}>
                <img src={measureFoot} alt="" width="100%" />
              </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div style={{ maxWidth: "900px", margin: "auto" }}>
            <h2>Delivery & Returns</h2>
            <h3>UNITED KINGDOM DELIVERIES</h3>
            <hr />
            <h3>SHIPPING OPTIONS</h3>
            <p>
              Standard Service Price Delivery Estimate - Order before 1PM
              Standard Delivery £4.99 2 - 3 working days (99.7% delivered by day
              2) Nominated Day Price Delivery Estimate - Order before 3PM
              Nominated Day £6.99 1 working day Saturday Delivery £9.99 Saturday
              Delivery Saturday Before 10:30am £19.99 Saturday Before 10:30am
              Saturday Before 12pm £16.99 Saturday Before 12pm Sunday Delivery
              £9.99 Sunday Delivery For information on delivery in a different
              currency please select from below:
            </p>
            <h3>RETURNS</h3>
            <p>
              We understand that sometimes you'll need to return items to us and
              we've made this easy, fast and simple.
            </p>
            <p>
              We want you to love our products as much as we do, so if it
              doesn’t fit, you’ve had a change of heart, if it’s faulty or you
              just aren’t feeling it. No worries! We believe returns should be
              easy.
            </p>
            <p>We'll exchange or refund all items which:</p>
            <p>Are returned to us within 100 days of receipt.</p>
            <p>
              Are returned to us within 100 days of receipt. Are returned to us
              in perfect condition, with their original packaging and with the
              labels attached. For health and hygiene reasons, we are unable to
              accept the return of underwear and swimwear that has been worn.
              Your statutory rights are not affected.
            </p>

            <h4>HOW TO RETURN</h4>
            <p>UK RETURNS - NOW EVEN EASIER</p>
            <p>
              We have teamed up with Hermes to offer you reduced cost home
              collection returns with myHermes if your item is under 15kg and
              less than 120 x 60 x 60cm, making ordering from SportsShoes.com
              easier than ever.
            </p>
            <p>
              Please pack your parcel up securely, preferably using its original
              packaging but removing the delivery label.
            </p>
            <p>
              Include the original delivery note with the reason for return
              completed.
            </p>
            <p>
              You'll need access to a printer to obtain a label for your parcel.
            </p>
            <p>
              Please note you can use MyHermes collections for all UK parcels,
              regardless of original courier.
            </p>
            <p>You can also take your parcel to any MyHermes ParcelShops.</p>
            <p>
              IMPORTANT PLEASE NOTE - The £2.95 returns label only insures your
              parcel up to £50.00 if the parcel is lost or damaged in transit.
              If your parcel is worth more than £50.00, we would advise you
              insure your parcel for a higher value with Hermes or return the
              parcel with an alternative courier who can provide the appropriate
              insurance. Hermes - Returns Collection from £2.95 - Arrange Your
              Return ASDA toyou - Arrange Your Return for £2.95 Great news,
              We’ve just partnered up with ASDA toyou to offer you an easy,
              local return experience. If your item is under 25kg, you can now
              return online through ASDA toyou in a few simple steps.
            </p>

            <p>
              Please pack your parcel up securely, preferably using its original
              packaging but removing the delivery label.
            </p>
            <p>
              Include the original delivery note with the reason for return
              completed.
            </p>
            <p>
              No printer required, simply create a QR code by clicking the link
              and follow the instructions.
            </p>
            <p>Take your return to your local ASDA.</p>
            <p>
              IMPORTANT PLEASE NOTE - The £2.95 returns label only insures your
              parcel up to £50.00 if the parcel is lost or damaged in transit.
            </p>
            <p>
              If your parcel is worth more than £50.00, we would advise you
              insure your parcel for a higher value with an alternative courier
              who can provide the appropriate insurance.
            </p>
          </div>
        </TabPanel>
      <TabPanel value={value} index={3}>
        <ReviewProduct productId={product?.id}/>
      </TabPanel>
      </SwipeableViews>
    </div>
  );
};
