import React, { useState, useEffect, useContext, useRef} from "react";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, Typography } from "@material-ui/core";
import { CartContext} from '../context/CartContext';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { ItemImage } from "./ItemImage";
export const MostPopular = (props) => {
  const [products, setProducts] = useState(Array.from({length: 4}, ()=>0));
  const container = useRef();
  const isMin = useRef(false);

  // Currently fetches 4 most recent products
  // ToDO:
  // implement google analytics to work out the most popular product pages for this component


  const fetchProducts = () => {
    commerce.products
      .list({limit: 4})
      .then((item) => {
        setProducts((items) => item.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleMinimize = ()=>{
    container.current.style.height =(isMin.current)? "fit-content" : "0px";
    isMin.current = !isMin.current;
  }

  return (
    <div>
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <h3 style={{textAlign:'start', marginLeft:'20px'}}>Most Popular</h3>
      <Button onClick={handleMinimize} ><ExpandMoreIcon/><ExpandLessIcon/></Button>
    </div>
      
      <hr/>
      <div ref={container} style={{height:'fit-content', overflow:'hidden'}}>
      <ul
        style={{
          display: "flex",
          flexFlow: "wrap",
          listStyle: "none",
          gap: "20px",
          margin: "auto",
          padding:'0',
          justifyContent:'center'
        }}
      >
        
        

        {products.map((item, index) => (
          <li  key={index} style={{ width: "24%", boxSizing: "border-box" }}>
     
        {typeof item !== 'object'?(
          <>
          <Typography variant="h4">
            <Skeleton style={{ margin: "11px auto" }} />
          </Typography>
          <Skeleton
            variant="rect"
            height={300}
            width={225}
            style={{ margin: "0px auto" }}
          ></Skeleton>
          

          <Skeleton height={25} style={{ margin: "20px auto 0" }}></Skeleton>
          <Skeleton height={25} style={{ margin: "10px auto 0" }}></Skeleton>
        </>
        ) : (
            <>
            <h4>{item.name}</h4>
            
            <ItemImage id={item.id} name={item.name} firstImage={item.media.source} secondImage={item.assets[1].url}/>
           
           
            <p style={{margin:'5px auto'}}>{item.price.formatted_with_symbol}</p>
            <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>

            </div>
            </>
            

          
        )}
        </li>

      
        ))}
      </ul>
      <hr/>
      </div>
     
    </div>
  );
};
