import React, {useEffect, useState} from 'react'
import { getHistory } from '../lib/localStorage';
import {
    Link
  } from "react-router-dom";

export const RecentlyViewed = () => {
    const [history, setHistory] = useState([])

    useEffect(()=>{
        setHistory(getHistory());
    },[])
    
    return (
    <div>
    <hr/>
    <h3 style={{textAlign:'start'}}>Recently Viewed</h3>
    <ul style={{display:'flex', listStyle:'none', gap:'20px'}}>
        {history.map((item, index)=>(
            <li key={index} style={{  boxSizing: "border-box" }}>
            {/* <h4>{item?.name}</h4> */}
           

               
            <Link to={{
              pathname: "/product",
              search: `?id=${item.id}`,
            }}>
               <img src={item?.media?.source} alt={item?.name} style={{maxWidth:'100%', maxHeight:'200px', objectFit:'cover'}} />
            </Link>
          {/* <p style={{margin:'0'}}>{item?.price?.formatted_with_symbol}</p> */}

           
            {/* <button onClick={()=>handleAddToCart(item)}>Add To Basket</button> */}
            {/* <a href={item.checkout_url.checkout}>Add to Basket</a> */}
          </li>
        ))}

    </ul>
    <hr/>
    </div>
    )
}
