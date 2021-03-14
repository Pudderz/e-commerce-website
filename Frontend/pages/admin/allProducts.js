import React, {useEffect} from 'react'
import { LOAD_ALL_PRODUCTS } from '../../GraphQL/Queries'
import { gql } from "@apollo/client";
import {  useLazyQuery } from "@apollo/client";
import { Button } from '@material-ui/core';


export const allProducts = () => {
    const [getProducts, { data, loading, error }] = useLazyQuery(LOAD_ALL_PRODUCTS);

    useEffect(() => {
        getProducts();
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    if(error) return (
        <div>
            <h2>Could not connect to server</h2>
            <p>{error.message}</p>
            <Button onClick={getProducts}>Reconnect</Button>
        </div>
    )
    if(loading) return (
        <div>
            <h2>loading</h2>
            
        </div>
    )
    return (
        <div>
            {JSON.stringify(data)}
            <ul>
              {data?.getAllProducts?.map((product, index)=>(
              <li key={index}>
                  <h4>{product.productName}</h4>
                  <p>{product.productId}</p>
              </li>  
            ))}  
            </ul>
            
        </div>
    )
}


export default allProducts;