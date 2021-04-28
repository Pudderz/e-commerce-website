import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FilterSize } from "./FilterSize";

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

export const StoreFilter = ({
  handleSizeFilterChange,
  handleOnSubmit,
  handleFilterChange,
  filters = initialFilterState,
  sizes = [],
}) => {
  console.log(filters);
  const { register, handleSubmit } = useForm();

  const handleChange = (ev) => {
    handleFilterChange(ev);
  };

  const handleSizeChange = (size) => {
    handleSizeFilterChange(size);
  };

  const onSubmit = (data) => {
    console.log(data);
    handleOnSubmit(data);
  };

  // visibilty of each section
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
      <ul
        style={{
          listStyle: "none",
          padding: "10px",
          textAlign: "start",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
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
                <Checkbox
                  inputRef={register}
                  name="over150"
                  color="primary"
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
                <Checkbox
                  inputRef={register}
                  name="running"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.running}
                />
              }
              label="Running"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="casual"
                  color="primary"
                  onChange={handleChange}
                  checked={filters.casual}
                />
              }
              label="Casual"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="hiking"
                  color="primary"
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
