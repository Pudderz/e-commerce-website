import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

export const ProductTabs = () => {
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
      </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <div>
            <h2>Nike Air Zoom Tempo NEXT% Running Shoes</h2>
            <p>
              The Nike Air Zoom Tempo NEXT% mixes durability with a design that
              helps push you towards your personal best. The result is a shoe
              built like a racer, but made for your everyday training routine.
            </p>
            <h3>High-Tenacity Flyknit Upper</h3>
            <p>
              Flyknit uppers will encase each foot in streamlined comfort.
              Perforations in the forefoot increase airflow, creating a better,
              healthier environment for your feet to thrive in. The translucent
              yarns sits close to the foot to ensure a dynamic, lightweight fit
              that's ideal for racing whilst perforations within the fabric
              allow cool air to flow throughout the upper when temperatures
              rise. As well as this, synthetic overlays have also been used on
              the upper to increases durability and support. The overlays create
              a secure and supportive fit whilst also provide lightweight
              abrasion resistance. A one-piece construction seamlessly
              integrates these areas of high breathability with stretch and
              support where you need it the most, adapting to the changing shape
              of your foot as it moves through the gait cycle and reducing
              slippage so that you can enjoy smooth, distraction-free speed. It
              swathes your foot in lightweight support and a seamless, sock-like
              fit - shrinking the risk of rubbing and blisters because we know
              how those can ruin your day. Cushioned heel pods reduce the risks
              of chafing and irritation whilst a heel loop allows for an easy on
              and off. Completing the upper is a asymmetrical lacing system
              which locks down the midfoot so you can enjoy distraction-free
              strides.
            </p>
            <h3>Zoom Air Midsole</h3>
            <p>
              Developed to deliver responsive cushioning and high energy return,
              the midsole of the Tempo Next% has been constructed using a
              combination of Nike ZoomX foam and Nike React Technology. Nike
              ZoomX foam has been used in the forefoot; ultra-light and
              super-responsive, the midsole material delivers Nike's greatest
              energy return yet; it absorbs impact and then expels it back out
              for a bounce-like effect. Signalling the incredible resilience of
              ZoomX, the tiny creases that occur on every midsole do not have an
              impact on the foam's performance; these beauty marks are a result
              of the autoclave process which places the foam under extreme heat
              and pressure. The ZoomX sheets are then compressed in a Phylon
              preform which shapes the midsole parts. Because the special foam
              is so lightweight (one third the weight of Cushlon), Nike are able
              to use more of it to separate your foot from the road; this means
              you get a thick and supportive midsole that will spare your joints
              as you strike down onto hard, unforgiving concrete. React
              cushioning resides heel to deliver feathery durability plus smooth
              responsiveness. To produce this startlingly lightweight and
              springy midsole, crafted from synthetic rubber, Nike listened to
              the voice of the athlete. Their in-house sports research lab
              plugged footstrike data into a proprietary algorithm that
              determined how much cushioning was needed where. They simulated
              testing on approximately one hundred possible shoe geometries to
              quickly determine the handful they knew would work best for most
              runners and then merged the science with an elegant design,
              intended to feel like a slipper on a mattress. The reactive nature
              of this clever midsole material means it absorbs impact and then
              expels it back out for a bounce-like effect. This energy-return
              technology reduces the use of superfluous muscle power,
              diminishing fatigue and enhancing performance, keeping you going
              for longer. Air zoom unit have also been used within the midsole
              of the Air Zoom Tempo Next% to deliver the most energy return of
              all Nike racing shoes. The units have been used within the
              forefoot to cushion the footstrike to offer you the best possible
              protection and comfort when running. Ensuring lightweight, durable
              and versatile cushioning, the units feature pressurised air inside
              that compresses and recovers as you run through the gait cycle.
              The unit compresses to reduce the force of impact and then
              recovery allows the air unit to return to its original shape and
              volume to ensure a soft and responsive base for you to push off
              from. Every time you land, the powerful Air Zoom cushions absorb
              your energy and shoot it right back-springing you into your next
              move.
            </p>
            <h3>Runner-Informed Traction Outsole</h3>
            <p>
              A lightweight, but durable, outsole completes the shoe. Its
              traction pattern is informed by an algorithm to identify lug
              shapes and sizes that optimise propulsion. The design places
              optimal rubber on the road for efficiency and traction;
              high-abrasion rubber adorns the rearfoot to increase durability,
              resisting the traumas of heel-strike to supply you with a reliable
              and long-lasting running buddy. Lightweight rubber covers the
              forefoot to provide grip and durability whilst enhancing
              energy-return. Flex grooves have been used on the rubber outsole
              to enhance multi-surface traction ensuring confident footing
              wherever you next race takes you. The durable rubber provides a
              strong grip and works to protect itself from damage, and protect
              users from losing control and slipping. It's all for the athletes
              who crave a shoe that's hard to run slow in, a shoe that allows
              you to maintain any given pace.
            </p>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h3>Size Guide</h3>

          {/* TODO Add Keys */}
          <table style={{width:'100%'}}>
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
          </table>
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
      </SwipeableViews>
    </div>
  );
};
