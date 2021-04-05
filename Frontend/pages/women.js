import React from "react";

export const Women = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#CE1121" }}>
        <img src={webBanner} alt="" />
      </div>

      <div>
        <h3>Best Sellers Womens products</h3>
        <hr />
      </div>
      <div>
        <h3>Newest Women Products</h3>
        <hr />
        <RecentProducts />
      </div>
      <div>
        <h3>Women discounts</h3>
        <hr />
        <RecentProducts />
      </div>
      <div>
        <h3>Women Categorys</h3>
        <hr />
        <Categories />
      </div>
    </div>
  );
};

export default Women;
