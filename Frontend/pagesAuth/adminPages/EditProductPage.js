import React from "react";
import AdminEditProductTabs  from "components/Admin/AdminEditProductTabs";
import { RecentlyViewed } from "components/Common/RecentlyViewed";

export const EditProductPage = (props) => {

  return (
    <div style={{ padding: "0 20px" }}>

      <AdminEditProductTabs product={props} />
      <RecentlyViewed />
    </div>
  );
};

export default EditProductPage;
