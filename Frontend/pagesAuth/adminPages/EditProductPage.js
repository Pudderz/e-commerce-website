import React from "react";
import { ProductTabs } from "../../components/Admin/ProductTabs";
import { RecentlyViewed } from "../../components/Common/RecentlyViewed";

export const EditProductPage = (props) => {

  return (
    <div style={{ padding: "0 20px" }}>

      <ProductTabs product={props} />
      <RecentlyViewed />
    </div>
  );
};

export default EditProductPage;
