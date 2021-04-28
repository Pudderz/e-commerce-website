import React, { useState, useEffect, useRef } from "react";
import { RecentlyViewed } from "../components/Common/RecentlyViewed";
import { Button } from "@material-ui/core";
import { useLazyQuery } from "@apollo/client";
import { LOAD_ALL_PRODUCTS } from "GraphQL/Queries";
import StoreFilter from "components/StorePage/storeFilter";
import StoreItems from "components/StorePage/StoreItems";
import { MobileFilters } from "components/StorePage/MobileFilters";
import styled from "styled-components";
import { useRouter } from "next/router";
import { createFilterUrlParams, getFilterSearchQuery } from "utils/url";

const FilterWrapper = styled.div`
  display: contents;
  @media (max-width: 1200px) {
    display: none;
  }
  &.hide {
    display: none;
  }
`;

const initialFilterState = {
  male: false,
  female: false,
  unisex: false,
  under100: false,
  between100And150: false,
  over150: false,
  running: false,
  hiking: false,
  casual: false,
  discounted: false,
};

export const StorePage = () => {
  const router = useRouter();
  const firstLoad = useRef(true);

  const [fetchProducts, { data, error, loading }] = useLazyQuery(
    LOAD_ALL_PRODUCTS
  );

  const [hide, setHide] = useState(true);
  const [filters, setFilters] = useState({
    ...initialFilterState,
  });
  console.log(filters);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sizes, setSizes] = useState([]);

  const getProducts = (variables) => fetchProducts({ variables });

  useEffect(() => {
    const {
      filterState,
      searchParam,
      variables,
      sortBy: sortByParam,
      stock,
    } = getFilterSearchQuery();
    setSizes(stock);
    
    if(sortByParam !== sortBy){
      setSortBy(sortByParam);
    }
    setFilters({ ...initialFilterState, ...filterState });
    setSearch(searchParam);
    getProducts(variables);
  }, [router.query]);

  const handleFormChange = () => {
    const url = createFilterUrlParams({ filters, sizes, search, sortBy });
    router.replace(url, undefined, {
      shallow: true,
    });
  };

  const handleChange = (ev) => {
    const value = ev.target.checked;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [ev.target.name]: value,
    }));
  };

  const handleSizeChange = (size) => {
    if (sizes.includes(size * 10)) {
      sizes.splice(sizes.indexOf(size * 10), 1);
      setSizes([...sizes]);
    } else {
      sizes.push(size * 10);
      setSizes([...sizes]);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    handleFormChange(data, sizes);
  };

  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterVisibility = () => {
    localStorage.setItem("filterVisible", !filterVisible);
    setFilterVisible((prevState) => !prevState);
    setHide((prev) => !prev);
  };

  useEffect(() => {
    let filter = localStorage.getItem("filterVisible");
    if (filter) {
      setFilterVisible(JSON.parse(filter));
    }
  }, []);

  const handleMobileFilter = () => {
    setHide((prev) => !prev);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  useEffect(
    () => {
      if (!firstLoad.current) {
        firstLoad.current = false;
        return;
      }
      handleFormChange();
    },
    [sortBy]
  );

  return (
    <div style={{ padding: "20px " }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Store</h3>
        <div style={{ display: "flex", alignContent: "center" }}>
          <div style={{ width: "100%" }}>
            <label htmlFor="sortBy" style={{ marginRight: "20px" }}>
              Sort By:
            </label>
            <select
              name="sortBy"
              onChange={handleSortByChange}
              value={sortBy}
            >
              <option value="" key="date">
                Newest
              </option>
              <option value="LowToHigh" key="LowToHigh">
                Low - High
              </option>
              <option value="HighToLow" key="HighToLow">
                High - Low
              </option>
              <option value="sold" key="sold">
                BestSellers
              </option>
            </select>
          </div>
          <Button onClick={handleFilterVisibility}>
            {filterVisible ? "Show Filters" : "Hide Filters"}
          </Button>
        </div>
      </div>
      <div>
        <MobileFilters handleOpenAndClose={handleMobileFilter} hide={hide}
        handleSizeFilterChange={handleSizeChange}
        handleOnSubmit={onSubmit}
        handleFilterChange={handleChange}
        filters={filters}
        sizes={sizes}
        />
      </div>
      <div className="storeContainer" style={{ display: "flex" }}>
        <FilterWrapper className={filterVisible && "hide"}>
          <StoreFilter
            getProducts={getProducts}
            handleSizeFilterChange={handleSizeChange}
            handleOnSubmit={onSubmit}
            handleFilterChange={handleChange}
            filters={filters}
            sizes={sizes}
          />
        </FilterWrapper>
        <StoreItems items={data?.getAllProducts} />
      </div>

      <RecentlyViewed />
    </div>
  );
};

export default StorePage;
