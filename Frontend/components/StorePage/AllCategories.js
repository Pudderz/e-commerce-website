import React, { useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "../../globals/globals";
import styled from "styled-components";

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0px;
`;

const ListItem = styled.li`
  text-align: start;
  background-color: #eee;
  padding: 5px;
  width: fit-content;
  border-radius: 5px;
`;

export const AllCategories = ({ onClick }) => {
  return (
    <div>
      <hr />
      <CategoryList>
        {CATEGORIES?.map((category, index) => (
          <ListItem key={index}>
            <Link href={`/store?${category.slug}=true`}>{category.name}</Link>
          </ListItem>
        ))}
      </CategoryList>
      <hr />
    </div>
  );
};

export default AllCategories;
