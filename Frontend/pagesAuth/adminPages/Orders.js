import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { LOAD_ALL_ORDERS } from "GraphQL/Queries";
import styled from "styled-components";

const OrderList = styled.div`
  text-align: start;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-direction: column;

  li {
    margin: 20px 0;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
    padding: 20px;
    
  }
  p {
    margin: auto;
  }
  h5{
    margin:auto;
  }
`;
export const Orders = () => {
  // useLazyQuery so query can be sent with jwt token
  const [getOrders, { data, refetch, called, error }] = useLazyQuery(
    LOAD_ALL_ORDERS
  );

  useEffect(() => {
    console.log(data?.getAllOrders);
    if (called) {
      refetch();
    } else {
      getOrders();
    }
  }, []);

  return (
    <div style={{ padding: "10px", margin: "auto", maxWidth: "900px" }}>
      <h3>Orders: {data?.getAllOrders?.length}</h3>

      <OrderList>
        {data?.getAllOrders?.map((order, index) => {
          const date = new Date(order.date);

          return (
            <li
              key={index}
            >
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
                <p>Total - £{(order?.price / 100).toFixed(2)}</p>
                <p>Status - {order.status || "none"}</p>
                <h5 style={{ margin: "auto" }}>Shipping Details</h5>
                <hr />
                <p style={{ margin: "auto" }}>{order.shippingAddress.name}</p>
                <p style={{ margin: "auto" }}>{order.shippingAddress.street}</p>
                <p style={{ margin: "auto" }}>
                  {order.shippingAddress.country}
                </p>
                <p style={{ margin: "auto" }}>
                  {order.shippingAddress.postalCode}
                </p>
                <h5 style={{ margin: "10px auto 0" }}>Order Notes</h5>
                <hr />
                <p style={{ margin: "auto" }}>{order.orderNotes}</p>
              </div>
              <div>
                <h3>All Products Brought</h3>
                <hr />
                {order?.allOrderItems?.map((product) => (
                  <div>
                    <Link href={`/product/${product.slug}`}>
                      {product.productName}
                    </Link>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </OrderList>
    </div>
  );
};

export default Orders;
