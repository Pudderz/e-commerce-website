import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { commerce, retreiveAllCategories } from "../../lib/commerce";
//Filter section for the list of items

// Gender

// Price bar

// Colour

// Brand

// Category

// Size

export const Filters = () => {
  const [categories, setCategories] = useState([]);

 
  useEffect(() => {
    retreiveAllCategories(setCategories);
  }, []);

  return (
    <div>

        <h4 style={{textAlign:'start'}}>All Categories</h4>
        <ul>
          {categories?.map((el, index) => (
            <li key={index} style={{textAlign:'start'}}>
              <Link href={`./category/${el.slug}`}>{el.name}</Link>
            </li>
          ))}
        </ul>
 
    </div>
  );
};
