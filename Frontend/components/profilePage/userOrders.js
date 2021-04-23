import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect} from "react";
import { LOAD_USER_ORDERS} from "../../GraphQL/Queries";

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
  );
};

export default UserOrders;
