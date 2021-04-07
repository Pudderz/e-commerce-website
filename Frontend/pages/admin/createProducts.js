import React from "react";
import dynamic from 'next/dynamic';
import AdminRoutes from "../../components/Authentication/AdminRoutes";

const CreateProducts = dynamic(() => import("../../adminPages/createProducts"));

export const CreateProductsPage = () => {

  return (
    <AdminRoutes>
      <CreateProducts/>
    </AdminRoutes>
  );
};

export default CreateProductsPage;
