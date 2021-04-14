import React, { useState } from "react";
import Link from 'next/link';

export const Filters = ({onClick}) => {

  const categories = [
    {
      name:"Hiking",
      description:"",
      slug:"hiking", 
    },
    {
      name:"Running",
      description:"",
      slug:"running"
    },
    {
      name:"Casual",
      description:"",
      slug:"casual",
    }
  ]

  const handleClick = ()=>{
    console.log('linkClicked')
    if(onClick){
      onClick();
    }
    
  }

  return (
    <div>

        <hr/>
        <ul style={{listStyle:'none', display:'flex', gap:'10px', padding:'0px'}}>
          {categories?.map((category, index) => (
            <li key={index} style={{textAlign:'start',backgroundColor:'#eee', padding:'5px', width:'fit-content', borderRadius:'5px' }}>
              <Link href={`/store?${category.slug}=true`} onClick={handleClick}>{category.name}</Link>
            </li>
          ))}
        </ul>
        <hr/>
 
    </div>
  );
};

export default Filters;