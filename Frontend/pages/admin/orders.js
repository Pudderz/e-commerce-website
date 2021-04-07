import React from 'react'
import dynamic from 'next/dynamic';
import AdminRoutes from "../../components/Authentication/AdminRoutes";

const Orders = dynamic(() => import("../pagesAuth/adminPages/Orders"));

export const OrdersPage = () => {
    return (
        <AdminRoutes>
            <Orders/>
        </AdminRoutes>
    )
}

export default OrdersPage;