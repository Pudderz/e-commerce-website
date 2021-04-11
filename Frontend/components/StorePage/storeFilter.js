import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FilterSize } from "./FilterSize";

export const StoreFilter = ({ handleFormChange }) => {
  const { register, handleSubmit } = useForm();

  const [sizes, setSizes] = useState([]);

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
      <ul style={{ listStyle: "none", padding: "10px", textAlign: "start" }}>
        <li className="smallFilter">
          <Button style={{ width: "100%" }} onClick={handleGenderVisibility}>
            Gender
          </Button>
          <hr />
          <div style={{ display: genderVisibility ? "contents" : "none" }}>
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="male" color="primary" />
              }
              label="Male"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="female" color="primary" />
              }
              label="Female"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="unisex" color="primary" />
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
                <Checkbox inputRef={register} name="under100" color="primary" />
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
                />
              }
              label="£100-£150"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="over150" color="primary" />
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
          <hr/>
          <div style={{ display: categoriesVisibility ? "contents" : "none" }}>
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="running" color="primary" />
              }
              label="Running"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="casual" color="primary" />
              }
              label="Casual"
            />
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox inputRef={register} name="hiking" color="primary" />
              }
              label="Hiking"
            />
          </div>
        </li>
        <li className="smallFilter">
          <Button style={{ width: "100%" }} onClick={handleSaleVisibility}>
            On Sale
          </Button>
          <hr/>
          <div style={{ display: saleVisibility ? "contents" : "none" }}>
            <FormControlLabel
              style={{ width: "100%" }}
              control={
                <Checkbox
                  inputRef={register}
                  name="discounted"
                  color="primary"
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
          <hr/>
          <div style={{ display: sizeVisibility ? "contents" : "none" }}>
            <FilterSize
              changeSize={(size) => handleSizeChange(size)}
              sizes={sizes}
            />
          </div>

          {/* <SelectSize availableSizes={[2,4,5]}></SelectSize> */}
        </li>
        <li>
          <label htmlFor="sortBy"></label>
          <select name="sortBy" ref={register}>
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
