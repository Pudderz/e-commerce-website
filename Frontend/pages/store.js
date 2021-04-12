import React, { useState, useEffect } from "react";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import { Button } from "@material-ui/core";
import { useLazyQuery } from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "../GraphQL/Queries";
import StoreFilter from "../components/StorePage/storeFilter";
import StoreItems from "../components/StorePage/StoreItems";

export const StorePage = () => {
  const [fetchProducts, { data, error, loading }] = useLazyQuery(
    LOAD_ALL_PRODUCTS
  );

  useEffect(() => {
    console.log(data);
  }, [data]);


  const getProducts =(variables)=>fetchProducts({ variables });
  

  const [filterVisible, setFilterVisible] = useState(false);
  const handleFilterVisibility = () => {
    localStorage.setItem("filterVisible", !filterVisible)
    setFilterVisible((prevState) => !prevState);
  
  };

  useEffect(() => {
    let filter = localStorage.getItem("filterVisible");
    if(filter){
      setFilterVisible(JSON.parse(filter))
    }

  }, [])


  return (
    <div>
      <div style={{ padding: "20px " }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Store</h3>
          <div style={{ display: "flex" }}>
            <Button onClick={handleFilterVisibility}>
              {filterVisible ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </div>
        <div className="storeContainer" style={{ display: "flex" }}>
          <div style={{ display: filterVisible ? "contents" : "none" }}>
            <StoreFilter
              getProducts={getProducts}
            />
          </div>
          <StoreItems items={data?.getAllProducts} />
        </div>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export default StorePage;
