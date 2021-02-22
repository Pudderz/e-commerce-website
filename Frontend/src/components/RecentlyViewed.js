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
    <ul style={{display:'flex', listStyle:'none', gap:'20px',overflowX:'auto', overflowY:'hidden',padding:' 0 20px 10px', justifyContent:'start', maxHeight:'20vh', position:'relative'}}>
        {history.map((item, index)=>(
            <li key={index} style={{  boxSizing: "border-box", maxHeight:'100%', width:'fit-content' }}>

               
            <Link to={{
              pathname: "/product",
              search: `?id=${item.id}`,
            }}>
               <img src={item?.media?.source} alt={item?.name} style={{maxWidth:'100%',height:'100%', maxHeight:'200px', objectFit:'cover', minWidth:'160px'}} />
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
