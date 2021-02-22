import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
//Filter section for the list of items

// Gender

// Price bar

// Colour

// Brand

// Category

// Size

export const Filters = () => {
  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const retreiveCategory = () => {
    commerce.categories
      .retrieve("running", { type: "slug" })
      .then((category) => {
        console.log(category);
        setCategory(category);
      });
  };

  const retreiveAllCategories = () => {
    commerce.categories.list().then((categories) => {
      setCategories(categories.data);
      console.log(categories.data);
    });
  };
  useEffect(() => {
    retreiveCategory();
    retreiveAllCategories();
    return () => {};
  }, []);
  return (
    <div>
      <h3>
        {category?.name}({category?.products})
      </h3>
      <p>{category?.description}</p>
      <div>
        <h4>All Categories</h4>
        <ul>
          {categories?.map((el, index) => (
            <li key={index} style={{textAlign:'start'}}>
              <Link to={`./category?category=${el.name}`}>{el.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
