import React, { useEffect } from "react";
import { LOAD_ALL_PRODUCTS } from "../../GraphQL/Queries";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Link from "next/link";

export const allProducts = () => {
  const [getProducts, { data, loading, error }] = useLazyQuery(
    LOAD_ALL_PRODUCTS
  );

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error)
    return (
      <div>
        <h2>Could not connect to server</h2>
        <p>{error.message}</p>
        <Button onClick={getProducts}>Reconnect</Button>
      </div>
    );
  if (loading)
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  return (
    <div>

      {/* <ul style={{listStyle:'none', maxWidth:'100%',width:'1100px', padding:'0', margin:'auto'}}>
        {data?.getAllProducts.map((product, index) => (
          <li key={index} >
            <h4>{product.productName}</h4>
            <p>{product.productId}</p>
            <p>{JSON.stringify(product)}</p>      
          </li>
        ))}
      </ul> */}
      <Link href="/admin/createProducts">Create a Product</Link>
      <table
        style={{
          width: "100%",
          maxWidth: "1100px",
          textAlign: "center",
          margin: "auto",
          overflow: "auto",
        }}
      >
        <thead>
          <tr>
            <th className="tableHeader">Item</th>
            <th className="tableHeader">Price</th>
            <th className="tableHeader">Remove</th>
          </tr>
        </thead>
        <tbody>
          {data?.getAllProducts.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="shoppingCartItem">
                  <div
                    style={{
                      height: "200px",
                      maxWidth: "150px",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={`
                    https://storage.googleapis.com/e-commerce-image-storage-202/${item?.images?.[0]}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3
                      style={{
                        width: "fit-content",
                        margin: "0",
                        fontSize: "clamp(14px, 2vw, 20px)",
                      }}
                    >
                      {item.productName}
                    </h3>
                    <p style={{ textAlign: "start" }}>Check/edit stock</p>
                    <Link href={`/admin/editProduct/${item?.slug}`}>Edit Product</Link>
                  </div>
                </div>
              </td>
              <td>
                <p>{`£${item.price}`}</p>
              </td>

              <td>
                <Tooltip title="Remove Item">
                  <IconButton >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default allProducts;
