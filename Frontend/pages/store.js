import React, { useState, useEffect } from "react";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import { Button } from "@material-ui/core";
import { useLazyQuery } from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "../GraphQL/Queries";
import StoreFilter from "../components/StorePage/storeFilter";
import StoreItems from "../components/StorePage/StoreItems";
import { useRouter } from 'next/router';

export const StorePage = () => {
  const router = useRouter()
  const [search, setSearch] = useState("");
  const [defaultSort, setDefaultSort] = useState("");
  const [fetchProducts, { data, error, loading }] = useLazyQuery(
    LOAD_ALL_PRODUCTS
  );
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   fetchProducts();
  // }, []);

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const variables = {};
    const searchParam = urlParams.get("search");
    if (searchParam) variables.search = searchParam;
    const discounted = urlParams.get("discounted");
    if (discounted) variables.discounted = JSON.parse(discounted);
    const sizes = urlParams.get("sizes");
    console.log([...decodeURIComponent(sizes)])
    if (sizes) variables.stockSize = decodeURIComponent(sizes).split(',').map(x=>+x);




    const running = urlParams.get("running");
    if (running) variables.running = JSON.parse(running);
    const hiking = urlParams.get("hiking");
    if (hiking) variables.hiking = JSON.parse(hiking);
    const casual = urlParams.get("casual");
    if (casual) variables.casual = JSON.parse(casual);
    const under100 = urlParams.get("under100");
    if (under100) variables.under100 = JSON.parse(under100);
    const over150 = urlParams.get("over150");
    if (over150) variables.over150 = JSON.parse(over150);
    const between100And150 = urlParams.get("between100And150");
    if (between100And150) variables.between100And150 = JSON.parse(between100And150);
    const male = urlParams.get("male");
    if (male) variables.male = JSON.parse(male);
    const female = urlParams.get("female");
    if (female) variables.female = JSON.parse(female);
    const unisex = urlParams.get("unisex");
    if (unisex) variables.unisex = JSON.parse(unisex);

    
    const sortByStorage = localStorage.getItem("sortBy");
    const sortBy = urlParams.get("sortBy");
    if (sortBy){
      variables.sortBy = sortBy;
      setDefaultSort(sortBy);

    } else if(sortByStorage){
      variables.sortBy = sortByStorage;
      console.log(sortByStorage);
      setDefaultSort(sortByStorage);
    }

    console.log(variables);

    
    setSearch(search);
    fetchProducts({ variables: variables });
  }, [router.query]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleFormChange = (data, sizes) => {
    
    console.log("form submitted");
    let filterBy = {};
    let filterUrlQuery = [];
    for (const [key, value] of Object.entries(data)) {
      console.log([key, value]);
      if (value) {
        filterBy[key] = true;
        filterUrlQuery.push(`${key}=${encodeURIComponent(value)}`)
      }
      if (key == "sortBy") {
        filterBy[key] = value;
        localStorage.setItem("sortBy", value);
      }
    }

    if(sizes.length>0){
      filterUrlQuery.push(`sizes=${encodeURIComponent(sizes)}`)
    }

    const urlParams = new URLSearchParams(window?.location?.search);
    const searchParam = urlParams.get("search");
    if (searchParam){
      filterBy["search"] = encodeURIComponent(searchParam);
      filterUrlQuery.push(`search=${encodeURIComponent(searchParam)}`)
    }
    console.log(filterUrlQuery.join("&"));
    router.replace(`/store?${filterUrlQuery.join("&")}`, undefined,{shallow: true})
    console.log(filterBy);
    // fetchProducts({ variables: { ...filterBy, stockSize: sizes } });

  };

  const [filterVisible, setFilterVisible] = useState(true);
  const handleFilterVisibility = () => {
    setFilterVisible((prevState) => !prevState);
  };

  const handleSort =(value)=>{
    console.log("handling sort")
    setDefaultSort(value);
  }
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
            <StoreFilter handleFormChange={handleFormChange} defaultSortBy={defaultSort} handleSort={handleSort} />
          </div>
          <StoreItems items={data?.getAllProducts} />
        </div>

        <RecentlyViewed />
      </div>
    </div>
  );
};

export default StorePage;
