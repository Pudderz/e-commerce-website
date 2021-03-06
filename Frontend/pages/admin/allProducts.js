import React from "react";
import dynamic from 'next/dynamic';
import AdminRoutes from "../../components/Authentication/AdminRoutes";
const AllProducts = dynamic(() => import("../../pagesAuth/adminPages/AllProducts"));
export const AllProductsPage = () => {

  return (
      <AdminRoutes>
        <AllProducts/>
      </AdminRoutes>
  );
};

export default AllProductsPage;
