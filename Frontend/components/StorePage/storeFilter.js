import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FilterSize } from "./FilterSize";

export const StoreFilter = ({
  getProducts
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [sizes, setSizes] = useState([]);

  // const [sortBy, setSortBy] = useState(false)

  const [filters, setFilters] = useState({
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
  });


  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleFetchProducts = (variables)=>{
    getProducts({...variables })
  }


  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const variables = {};
    let filterState = {
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


    const searchParam = urlParams.get("search");
    console.log(urlParams.toString());
    if (searchParam) variables.search = searchParam;
    
    const sizes = urlParams.get("sizes");
    
    if (sizes){
      let stock = decodeURIComponent(sizes).split(',').map(x=>+x);
      console.log(stock);
      variables.stockSize = stock;
      setSizes(stock);

    }

    const discounted = urlParams.get("discounted");
    if (discounted){
      variables.discounted = JSON.parse(discounted);
      filterState.discounted = true;
    } 

    const running = urlParams.get("running");
    if (running){
      variables.running = JSON.parse(running);
      filterState.running = true;
    } 

    const hiking = urlParams.get("hiking");
    if (hiking){
      variables.hiking = JSON.parse(hiking);
      filterState.hiking = true;
    } 
    const casual = urlParams.get("casual");
    if (casual){
      variables.casual = JSON.parse(casual);
      filterState.casual = true;
    } 
    const under100 = urlParams.get("under100");
    if (under100){
      variables.under100 = JSON.parse(under100);
      filterState.under100 = true;
    } 
    const over150 = urlParams.get("over150");
    if (over150){
      filterState.over150 = true;
      variables.over150 = JSON.parse(over150);
    } 
    const between100And150 = urlParams.get("between100And150");
    if (between100And150){
      variables.between100And150 = JSON.parse(between100And150);
      filterState.between100And150 = true;
    } 
    const male = urlParams.get("male");
    if (male){
       variables.male = JSON.parse(male);
       filterState.male = true;
    }
    const female = urlParams.get("female");
    if (female){
      variables.female = JSON.parse(female);
      filterState.female = true;
    } 
    const unisex = urlParams.get("unisex");
    if (unisex){
 variables.unisex = JSON.parse(unisex);
      filterState.unisex = true;
    }

    
    const sortByStorage = localStorage.getItem("sortBy");
    const sortBy = urlParams.get("sortBy");
    if (sortBy){
      variables.sortBy = sortBy;
      setSortBy(sortBy);

    } else if(sortByStorage){
      variables.sortBy = sortByStorage;
      console.log(sortByStorage);
      setSortBy(sortByStorage);
    }

    console.log(variables);
    setFilters(filterState);
    
    setSearch(search);
    handleFetchProducts( variables );
  }, [router.query]);



  const handleFormChange = (data, sizes) => {
    console.log("form submitted");
    let filterBy = {};
    let filterUrlQuery = [];
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        filterBy[key] = true;
        filterUrlQuery.push(`${key}=${encodeURIComponent(value)}`);
      }
      if (key == "sortBy") {
        filterBy[key] = value;
        localStorage.setItem("sortBy", value);
      }
    }

    if (sizes.length > 0) {
      filterUrlQuery.push(`sizes=${encodeURIComponent(sizes)}`);
    }

    const urlParams = new URLSearchParams(window?.location?.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      filterBy["search"] = encodeURIComponent(searchParam);
      filterUrlQuery.push(`search=${encodeURIComponent(searchParam)}`);
    }
    console.log(filterUrlQuery.join("&"));
    router.replace(`/store?${filterUrlQuery.join("&")}`, undefined, {
      shallow: true,
    });
    console.log(filterBy);
    // fetchProducts({ variables: { ...filterBy, stockSize: sizes } });
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

  useEffect(() => {
    console.log(sortBy);
  }, [sortBy]);

  const handleSortByChange = (e) => {
    console.log(e.target);
    // handleSort(e.target.value);
    setSortBy(e.target.value)
  };

  const [priceVisibility, setPriceVisbility] = useState(true);

  const handlePriceVisibility = () =>
    setPriceVisbility((prevState) => !prevState);

  const [genderVisibility, setGenderVisbility] = useState(true);

  const handleGenderVisibility = () =>
    setGenderVisbility((prevState) => !prevState);

  const [categoriesVisibility, setCategoriesVisbility] = useState(true);

  const handleCategoriesVisibility = () =>
    setCategoriesVisbility((prevState) => !prevState);

  const [saleVisibility, setSaleVisbility] = useState(true);

  const handleSaleVisibility = () =>
    setSaleVisbility((prevState) => !prevState);

  const [sizeVisibility, setSizeVisbility] = useState(true);

  const handleSizeVisibility = () =>
    setSizeVisbility((prevState) => !prevState);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul style={{ listStyle: "none", padding: "10px", textAlign: "start",display:'flex',flexWrap:'wrap' }}>
      <li style={{marginBottom:'20px', width:'100%'}}>
          <label htmlFor="sortBy" style={{marginRight:'20px'}}>Sort By:</label>
          <select
            name="sortBy"
            ref={register}
            onChange={handleSortByChange}
            value={sortBy}
            // defaultValue={defaultSortBy}
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
        </li>
        <li className="smallFilter">
          <Button style={{ width: "100%" }} onClick={handleGenderVisibility}>
            Gender
          </Button>
          <hr />
          <div style={{ display: genderVisibility ? "contents" : "none" }}>
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="male"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.male}
                />
              }
              label="Male"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="female"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.female}
                />
              }
              label="Female"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="unisex"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.unisex}
                />
              }
              label="Unisex"
            />
          </div>
        </li>

        <li className="smallFilter">
          <Button style={{ width: "100%" }} onClick={handlePriceVisibility}>
            Shop By Price
          </Button>
          <hr />
          <div style={{ display: priceVisibility ? "contents" : "none" }}>
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="under100"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.under100}
                />
              }
              label="Under £100"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="between100And150"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.between100And150}
                />
              }
              label="£100-£150"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="over150" color="primary"
                onChange={handleChange}
                  checked={filters.over150}
                />
              }
              label="£150+"
            />
          </div>
        </li>
        <li className="smallFilter">
          <Button
            style={{ width: "100%" }}
            onClick={handleCategoriesVisibility}
          >
            Shop By Categories
          </Button>
          <hr />
          <div style={{ display: categoriesVisibility ? "contents" : "none" }}>
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="running" color="primary"
                onChange={handleChange}
                  checked={filters.running}
                />
              }
              label="Running"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="casual" color="primary"
                onChange={handleChange}
                  checked={filters.casual}
                />
              }
              label="Casual"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="hiking" color="primary" 
                onChange={handleChange}
                  checked={filters.hiking}
                />
              }
              label="Hiking"
            />
          </div>
        </li>
        <li className="smallFilter">
          <Button style={{ width: "100%" }} onClick={handleSaleVisibility}>
            On Sale
          </Button>
          <hr />
          <div style={{ display: saleVisibility ? "contents" : "none" }}>
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="discounted"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.discounted}
                />
              }
              label="Discounted"
            />
          </div>
        </li>

        <li className="sizeSelection">
          <Button style={{ width: "100%" }} onClick={handleSizeVisibility}>
            Size
          </Button>
          <hr />
          <div style={{ display: sizeVisibility ? "contents" : "none" }}>
            <FilterSize
              changeSize={(size) => handleSizeChange(size)}
              sizes={sizes}
            />
          </div>

          {/* <SelectSize availableSizes={[2,4,5]}></SelectSize> */}
        </li>
       
        <li className="formSubmit">
          <Button variant="contained" color="primary" type="submit">
            Apply Changes
          </Button>
        </li>
      </ul>
    </form>
  );
};

export default StoreFilter;
