import React, { useState, useEffect } from "react";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import {
  Button,
} from "@material-ui/core";
import { useLazyQuery} from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "../GraphQL/Queries";
import StoreFilter from "../components/StorePage/storeFilter";
import StoreItems from "../components/StorePage/StoreItems";

export const StorePage = () => {

   const [search, setSearch] = useState("");

  const [fetchProducts, { data, error, loading }] = useLazyQuery(
    LOAD_ALL_PRODUCTS
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    setSearch(search);
    fetchProducts({variables:{search: searchParam}});
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);


  const handleFormChange = (data)=>{
    console.log(data);
    let filterBy = {};
    for(const [key, value] of Object.entries(data)){
      if(value){
        filterBy[key] = true;
      }
    }
    
    fetchProducts({variables:{...filterBy}})
  }

  return (
    <div>

      <div style={{ padding: "20px " }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Store</h3>
          <div style={{ display: "flex" }}>
            <Button>Hide Filters</Button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <StoreFilter handleFormChange={handleFormChange}/>
          <StoreItems items ={data?.getAllProducts}/>
        </div>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export default StorePage;
