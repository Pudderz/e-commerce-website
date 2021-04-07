import React from 'react'
import { gql } from "@apollo/client";
import { useDropzone } from "react-dropzone";
import {  useLazyQuery } from "@apollo/client";

// const findAllOrders = gql`
//   query{
//     allOrders{
      
//     }
//   }
// `;
// Get all orders sorted by date
// Display in order
export const Orders = () => {
    return (
        <div>
            <h2>Orders page</h2>
        </div>
    )
}

export default Orders;