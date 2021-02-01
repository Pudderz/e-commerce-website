import { Avatar, Button } from "@material-ui/core";
import React from "react";

export const ReviewProduct = () => {
  return (
    <div style={{ textAlign: "start", maxWidth: "600px", margin: "auto" }}>
      <h2>Customer Reviews</h2>

      <div>
        <hr />
        <h3>Review this product</h3>
        <p>Share your thoughts with other customers</p>
        <Button variant="contained">Write a customer review</Button>
        <hr />
      </div>

      <div>
        <select>
          <option value="top" key="">
            Top reviews
          </option>
          <option value="recent" key="">
            Most recent
          </option>
        </select>
      </div>

      <h3>Top reviews</h3>

      {/* Demo review template for later */}
      <ol style={{ listStyle: "none", padding: "0" }}>
        <li>
          <div style={{ display: "flex" }}>
            <Avatar />
            <p
              style={{
                display: "table-cell",
                verticalAlign: "middle",
                margin: "auto 20px",
              }}
            >
              Username
            </p>
          </div>
          <div style={{ display: "flex" }}>
            {/* Review stars */}
            <h4 style={{ margin: "5px 0" }}>Review Title</h4>
          </div>
          <div>
            <p style={{ margin: "5px 0" }}>
              Reviewed in the United Kingdom on 3 August 2018
            </p>
          </div>
          <div>
            <p>
              Generally speaking its a good tablet, it works nicely though there
              are quite a few bugs with the touch controls and the buttons
              sometimes decide not to work. I would normally brush these off but
              after spending £500 it seems only fair to point them out. However
              my biggest complain is that the nibs are just awful, I've had it
              for less than a week and the first nib is completely unusable and
              I'm halfway through the second nib. I Must have used it for less
              than 5 hours so far. It does come with replacement nibs but at the
              current rate they will last me till the end of the month at tops.
              When I contacted Wacom they suggested I get the smooth texture to
              apply to my tablet, I wouldn't mind but they cost £40 each which
              in my opinion is really cheeky including I've just spend £500 on a
              new tables. Its a shame because other than that I've enjoyed using
              the product so far. Not sure if I'd recommend honestly.
            </p>
          </div>
          <div>
            <p>84 people found this helpful</p>
            <button>Helpful</button>
          </div>
        </li>
      </ol>

      <p>There are no reviews for this item. Be the first to review it!</p>
      <Button variant="contained">Write a customer review</Button>
    </div>
  );
};
