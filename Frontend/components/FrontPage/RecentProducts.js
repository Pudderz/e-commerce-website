import React, { useState, useEffect, useContext,useRef } from "react";
import { commerce } from "../../lib/commerce";
import Skeleton from "@material-ui/lab/Skeleton";
import { Button, Typography } from "@material-ui/core";
import { CartContext } from "../../context/CartContext";
// import hikingBackground from "../images/hikingBackground.jpg";
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { ItemImage } from "../Common/ItemImage";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const RecentProducts = (props) => {
  const [products, setProducts] = useState(Array.from({length: 8}, ()=>0));
  // const [cart, changeCart] = useState({});

  const {  changeCart } = useContext(CartContext);
  const container = useRef()
  const isMin = useRef(false)
  const fetchProducts = () => {
    commerce.products
      .list({limit: 8})
      .then((item) => {
        setProducts((items) => item.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  const fetchCart = () => {
    commerce.cart
      .retrieve()
      .then((cart) => {
        changeCart(cart);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart", error);
      });
  };

  const handleMinimize = ()=>{
    container.current.style.height =(isMin.current)? "fit-content" : "0px";
    isMin.current = !isMin.current;
  }
 
  useEffect(() => {
    fetchProducts();
    fetchCart();

    return () => {};
  }, []);

  useEffect(() => {
    console.log(products);
    return () => {};
  }, [products]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ textAlign: "start", marginLeft: "20px" }}>Newest</h3>
        <Button onClick={handleMinimize} ><ExpandMoreIcon/><ExpandLessIcon/></Button>
      </div>

      <hr />
      <div ref={container} style={{overflow:'hidden', height:'fit-content'}}>
      <ul
        style={{
          display: "flex",
          flexFlow: "wrap",
          listStyle: "none",
          gap:'20px',
          margin: "auto",
          padding: "20px",
          boxSizing:'border-box',
          justifyContent: "center",
        }}
      >
        

        {products.map((item, index) => (
          <li key={index} style={{ width: "24%",minWidth:'150px',maxWidth:'300px', boxSizing: "border-box", flexGrow:'1' }}>
          
            {typeof item!== 'object'?(
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
            ): (
               <>
               
           <ItemImage id={item.id} name={item.name} firstImage={item.media.source} secondImage={item.assets[1].url} link={item.permalink}/> 
            {/* <Link
              to={{
                pathname: "/product",
                search: `?id=${item.id}`,
              }}
            >
            <img src={item.media.source} alt={item.name}  style={{maxWidth:'100%', maxHeight:'300px'}} />
           
            */}
            {/* </Link> */}
           <h4 style={{margin:'10px auto 0'}}>{item.name}</h4>
            <p style={{margin:'auto'}}>{item.price.formatted_with_symbol}</p>

          </> 
            )}
          </li>
        ))}
      </ul>
      </div>
     
    </div>
  );
};
