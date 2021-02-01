import React, { useState, useEffect, useContext} from "react";
import { Cart } from "../components/Cart";
import { commerce } from "../lib/commerce";
import { Link } from "react-router-dom";
import { RecentlyViewed } from "../components/RecentlyViewed";
import Skeleton from "@material-ui/lab/Skeleton";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { CartContext} from '../context/CartContext';
import runningBackground from '../images/runningBackground.jpg'
import hikingBackground from '../images/hikingBackground2.jpg'
import casualBackground from '../images/casualBackground2.jpg'

export const CategoryPage = (props) => {
  const [products, setProducts] = useState(Array.from({length: 12}, (v, i) => i));


  const {cart, changeCart} = useContext(CartContext)

  const fetchProducts = (category) => {
    commerce.products
      .list({
        category_slug: category,
      })
      .then((item) => {
        setProducts((items) => item.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };


  const handleAddToCart = (item, quantity = 1) => {
    commerce.cart
      .add(item.id, quantity)
      .then((item) => {
        changeCart(item.cart);
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
  };

  const [category, setCategory] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let category = params.get("category");
    setCategory(category);
    fetchProducts(category);
    return () => {};
  }, []);

  useEffect(() => {
    console.log(products);
    return () => {};
  }, [products]);




  return (
    <div>
      
      <div style={{ backgroundColor: "grey", height: "300px", width: "100%", backgroundColor: '#CE1121', position:'relative'}}>
        {category==='running' &&(
          <img src={runningBackground} alt="" height="100%" style={{position:'absolute', top:'0', bottom:'0', width:'100%', objectFit:'cover', left:'0'}}/>
        )}
         {category==='hiking' &&(
          <img src={hikingBackground} alt="" height="100%" style={{position:'absolute', top:'0', bottom:'0', width:'100%', objectFit:'cover', left:'0'}}/>
        )}
        {category==='casual' &&(
          <img src={casualBackground} alt="" height="100%" style={{position:'absolute', top:'0', bottom:'0', width:'100%', objectFit:'cover', left:'0', objectPosition:'75% 65%'}}/>
        )}
      </div>
      <div style={{padding:'20px 20px 0'}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Typography>{category.charAt(0).toUpperCase() + category.slice(1)}</Typography>
      </Breadcrumbs>
      <ul
        style={{
          display: "flex",
          flexFlow: "wrap",
          listStyle: "none",
          gap: "20px",
          margin: "auto",
          justifyContent:'center',
          padding:'0'
        }}
      >

        {products?.map((item, index) => (
          
          <li key={index} style={{ width: "20%", boxSizing: "border-box" }}>
            {typeof item !== 'object'? (
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
             <div></div>
   
             <Skeleton height={25} style={{ margin: "20px auto 0" }}></Skeleton>
             <Skeleton height={25} style={{ margin: "10px auto 0" }}></Skeleton>
   </>
            ):(
              <>
 <h4>{item.name}</h4>
            <Link
              to={{
                pathname: "/product",
                search: `?id=${item.id}`,
              }}
            >
            <img src={item.media.source} alt={item.name} height="300" />
             </Link>
            <p>{item.price.formatted_with_symbol}</p>
            <a href={item.checkout_url.checkout}>Buy Now</a>
            <button onClick={() => handleAddToCart(item)}>Add To Basket</button>
           </> 
            )}
           
          </li>
        ))}
      </ul>

      <RecentlyViewed />
      </div>
    </div>
  );
};
