import React, { useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Avatar, Badge, Button, IconButton, Tooltip } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { Switch } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { LogoutButton } from "./LogoutButton";
import { commerce, fetchCart, handleAddToCart, updateCartQty } from "../lib/commerce";
import DeleteIcon from '@material-ui/icons/Delete';
/* 
HEADER COMPONENT


Location Page (Links to Map showing shops nearby)

Profile button (goes to login in page if not signed in)

Basket Button showing num of items in Basket (onClick goes to basket page)

*/

export const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {cart, changeCart} = useContext(CartContext)


  const [anchorProfileEl, setAnchorProfileEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };


  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const openProfile = Boolean(anchorProfileEl);


  const [anchorBasketEl, setAnchorBasketEl] = useState(null);

  const handleBasketClick = (event) => {
    setAnchorBasketEl(event.currentTarget);
  };


  const handleBasketClose = () => {
    setAnchorBasketEl(null);
  };

  const openBasket = Boolean(anchorBasketEl);

  
  useEffect(() => {
    fetchCart(changeCart);
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const updateQty =(id, newQuantity)=>{
      updateCartQty(id, newQuantity, changeCart)
  }




  const handledarkmodeChange = () =>{}
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        backgroundColor: "#fff",
        padding: "10px 0",
        margin: "0",
        zIndex:'2',
        
      }}
    >
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-around",
            margin: "0",
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/findastore">Find a Nearby Store</Link>
          </li>
 
          <li>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <li>
                
                <Tooltip title="Dark Mode On/Off">
                  <Switch
            checked={false}
            onChange={handledarkmodeChange}
            name="darkMode"
            color="primary"
          />
                </Tooltip>
                
              </li>

              {isAuthenticated ? (
                <li>
                  <Tooltip title="Profile">

                      <IconButton aria-label="profile" onClick={handleProfileClick}>
                      
                        {typeof user.picture ?(
                        
                        <Avatar src={user?.picture} alt={user?.name} style={{height:'25px', width:'25px'}} />
                        ):(
                          <AccountCircleIcon />
                        )}
                        
                      </IconButton>
                  </Tooltip>

                  <Popover
                  open={openProfile}
                  anchorEl={anchorProfileEl}
                  onClose={handleProfileClose}
                  anchorOrigin={{
                    vertical: 'bottom',
          horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  >
                    <div style={{padding:'5px'}}>
                      <p>Contents</p>
                    <Link to="/profile">
                      Profile
                    </Link>
                    <LogoutButton/>
                  
                    </div>
                    
                  </Popover>
                </li>
              ) : (
                <li>
                  <LoginButton />
                </li>
              )}

              <li>
                <Tooltip title="Basket">
                    <IconButton aria-label="cart" onClick={handleBasketClick}>
                      <Badge badgeContent={cart.total_items} color="primary">
                        <ShoppingBasketIcon />
                      </Badge>
                    </IconButton>
                </Tooltip>
                
                <Popover
                  open={openBasket}
                  anchorEl={anchorBasketEl}
                  onClose={handleBasketClose}
                  anchorOrigin={{
                    vertical: 'bottom',
          horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  >
                    <h1>Shopping cart</h1>
      <hr />
      <ul style={{listStyle:'none',display:'grid', gap:'50px', padding:'0', maxWidth:'100%'}}>
        {cart?.line_items?.length === 0? (
          <div>
            <h3>Your Basket is empty</h3>
            <p>Continue shopping on the <a href="">homepage</a>, browse our discounts, or visit your Wish List</p>
          </div>
          
        ):(
          <div>
            {cart?.line_items?.map(item => (
              
          <li key={item.id}>
            <div style={{display:'flex', justifyContent:'flex-start', gap:'20px'}}>
              <div style={{backgroundColor:'blue', height:'100px', width:'100px', position:'relative', overflow:'hidden'}}>
                <Link to={{
                pathname: "/product",
                search: `?id=${item.product_id}`,
              }}
              onClick={handleBasketClose}
              >
                  <img src={item?.media?.source} width="100"alt="" style={{position:'absolute', top:'0', left:'0', bottom:'0', objectFit:'cover', right:'0'}}/>
                </Link>

              </div>
                
                <div style={{display:'grid'}}>
                 <h3 style={{margin:'0', width:'fit-content'}}>{item.name}</h3>    
<p style={{margin:'0', width:'fit-content'}}>{item.price?.formatted_with_symbol}</p>    
            <p style={{margin:'0', width:'fit-content'}}>Quantity: {item.quantity}</p>
            <div style={{width:'fit-content'}}>
              <Tooltip title="Add 1">
                <Button onClick={()=>updateQty(item.id, item.quantity+1)}>+</Button>
              </Tooltip>
              <Tooltip title="Remove 1">
                <Button onClick={()=>updateQty(item.id, item.quantity-1)}>-</Button> 
              </Tooltip>
              <Tooltip title="Remove Item">
                <IconButton onClick={()=>updateQty(item.id, 0)}>
                  <DeleteIcon fontSize="small"/>
                </IconButton>
                
              </Tooltip>
            </div>
            
                </div>
            
            
            
            </div>
            {/* <hr style={{margin:'0 0 5px'}}/> */}
          </li>
        ))}
          </div>
        )}
        
      </ul>
      <hr />
      <div  style={{margin:'auto', padding:' 5px 0 10px', width:'fit-content', boxSizing:'border-box'}}>
 <Link to="basket" onClick={handleBasketClose}>
                      Go To Basket
                    </Link>
      </div>
                   
               
                  </Popover>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};
