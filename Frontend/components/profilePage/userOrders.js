import { useLazyQuery, useMutation } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { DELETE_USER_REVIEW, EDIT_USER_REVIEW } from "../../GraphQL/Mutations";
import { LOAD_USER_ORDERS} from "../../GraphQL/Queries";
import CloseIcon from "@material-ui/icons/Close";
export const UserOrders = () => {

  // useLazyQuery so query can be sent with jwt token
  const [getOrders, { data, refetch, called, error }] = useLazyQuery(
    LOAD_USER_ORDERS
    )

  useEffect(() => {
    console.log(data?.getUserOrders);
    if (called) {
      refetch();
    } else {
      getOrders();
    }
  }, []);

useEffect(() => {
    console.log(data)
}, [data])
  return (
    <div>
      <div style={{ padding: "10px", backgroundColor: "#fff", margin: "auto" }}>
        <h3>Orders: {data?.getUserOrders?.length}</h3>

        <ul
          style={{
            textAlign: "start",
            padding: "0px",
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {data?.getUserOrders?.map((order, index) => {
              const date = new Date(order.date);

             return (
            <li key={index} style={{ margin: "20px 0",
            boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.3)",
            padding:'20px'
            }}>
                
           

              <div style={{ display: "flex", gap: "20px" }}>
                <h3
                  style={{ margin: "0", fontWeight: "500", fontSize: "25px" }}
                >
                   {"Date: " +
                      date.getDate() +
                      "/" +
                      (date.getMonth() + 1) +
                      "/" +
                      date.getFullYear() +
                      " " +
                      date.getHours() +
                      ":" +
                      date.getMinutes() +
                      ":" +
                      date.getSeconds()}
                </h3>

              </div>

              <div>
                <p>Total - £{(order?.price/100).toFixed(2)}</p>
                <p>Status - Paided For</p>
              </div>
              <div>
                <h3>All Products Brought</h3>
                <hr/>
                {order?.allOrderItems?.map(product=>(
                    <div>
                        <Link href={`/product/${product.slug}`}>
                            {product.productName}
                        </Link>
                     
                    </div>
                ))}
              </div>

            </li>
          )})}
        </ul>
      </div>
    </div>
  );
};

export default UserOrders;
