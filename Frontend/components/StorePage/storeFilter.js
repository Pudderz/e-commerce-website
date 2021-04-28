import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FilterSize } from "./FilterSize";
import styled from "styled-components";

const Header = styled.h4`
  font-size: 1rem;
  color: #403d3d;
  margin: 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 10px;
  text-align: start;
  display: flex;
  flex-wrap: wrap;
`;

const SmallListItem = styled.li`
  flex-grow: 1;

  @media (max-width: 1100px) {
    width: 50%;
    min-width: 200px;
    display: inline-block;
    vertical-align: top;
  }
`;

export const StoreFilter = ({
  handleSizeFilterChange,
  handleOnSubmit,
  handleFilterChange,
  filters,
  sizes,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <List>
        <SmallListItem>
          <Header style={{ width: "100%" }}>Gender</Header>
          <hr />

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
        </SmallListItem>

        <SmallListItem>
          <Header style={{ width: "100%" }}>Shop By Price</Header>
          <hr />
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
        </SmallListItem>
        <SmallListItem>
          <Header style={{ width: "100%" }}>Shop By Categories</Header>
          <hr />
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
        </SmallListItem>
        <SmallListItem >
          <Header style={{ width: "100%" }}>On Sale</Header>
          <hr />
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
        </SmallListItem>

        <li className="sizeSelection">
          <Header style={{ width: "100%" }}>Size</Header>
          <hr />
          <FilterSize
            changeSize={(size) => handleSizeChange(size)}
            sizes={sizes}
          />
        </li>

        <li className="formSubmit">
          <Button variant="contained" color="primary" type="submit">
            Apply Changes
          </Button>
        </li>
      </List>
    </form>
  );
};

export default StoreFilter;
