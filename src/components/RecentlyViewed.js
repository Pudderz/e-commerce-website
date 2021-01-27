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
    Recently viewed (Browsing History)
    <hr/>
    <ul style={{display:'flex', listStyle:'none'}}>
        {history.map((item, index)=>(
            <li key={index} style={{ width: "20%", boxSizing: "border-box" }}>
            <h4>{item?.name}</h4>
            <img src={item?.media?.source} alt={item?.name} height="300" />
            <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
            <p>{item?.price?.formatted_with_symbol}</p>
            <Link to={{
              pathname: "/product",
              search: `?id=${item.id}`,
            }}>Details</Link>
            <p></p>
            <a href={item?.checkout_url?.checkout}>Buy Now</a>
            {/* <button onClick={()=>handleAddToCart(item)}>Add To Basket</button> */}
            {/* <a href={item.checkout_url.checkout}>Add to Basket</a> */}
          </li>
        ))}

    </ul>
    <hr/>
    </div>
    )
}
