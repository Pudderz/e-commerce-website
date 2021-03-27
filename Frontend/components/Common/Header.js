import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {
  Avatar,
  Badge,
  Button,
  ClickAwayListener,
  Drawer,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Authentication/LoginButton";
import { Switch } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { LogoutButton } from "../Authentication/LogoutButton";
import { fetchCart } from "../../lib/commerce";
import DeleteIcon from "@material-ui/icons/Delete";
import { Filters } from "..//StorePage/Filters";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
/* 
HEADER COMPONENT


Location Page (Links to Map showing shops nearby)

Profile button (goes to login in page if not signed in)

Basket Button showing num of items in Basket (onClick goes to basket page)

*/

export const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const { cart, changeCart, removeFromCart, updateQty } = useContext(
    CartContext
  );
  const [anchorBasketEl, setAnchorBasketEl] = useState(null);
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const handleBasketClick = (event) => {
    setAnchorBasketEl(event.currentTarget);
  };

  const handleBasketClose = () => {
    setAnchorBasketEl(null);
  };

  const openProfile = Boolean(anchorProfileEl);

  const openBasket = Boolean(anchorBasketEl);

  useEffect(() => {
    fetchCart(changeCart);
  }, []);

  const updateItemQty = (id, newQuantity, variantId, optionId) => {
    updateQty(id, newQuantity, variantId, optionId);
  };

  const removeItem = (id) => removeFromCart(id);

  const handledarkmodeChange = () => {};

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "#fff",
          boxShadow: "rgb(0 0 0) 0px -17px 26px",
          // padding: "10px 0",
          margin: "0",
          zIndex: "4",
        }}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-between",
            margin: "0",
            maxWidth: "100%",
            boxSizing: "border-box",
            padding: "0 20px",
            height: "100%",
          }}
        >
          <li>
            <div
              style={{
                display: "flex",
                gap: "20px",
                margin: "10px 0",
                height: "100%",
              }}
            >
              <Link className="link" href="/">
                Home
              </Link>
              <Link className="link" href="/store">
                Store
              </Link>
            </div>
          </li>
          <li>
            <div
              onPointerEnter={handleMenuOpen}
              onPointerLeave={handleMenuClose}
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              <div className="dropdown">
                <Button
                  className="headerButton"
                  style={{
                    textTransform: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Men
                </Button>
                <div className="dropdown-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "900px",
                      margin: "auto",
                      padding: "40px 0",
                    }}
                  >
                    <div>
                      <a href="">Featured</a>
                      <a href="">New Releases</a>
                    </div>
                    <div>
                      <a href="">All Shoes</a>
                      <a href="">Running</a>
                      <a href="">Casual</a>
                      <a href="">Hiking</a>
                    </div>
                    <div>
                      <a href="">Trending</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <Button
                  className="headerButton"
                  style={{
                    textTransform: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Women
                </Button>
                <div className="dropdown-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "900px",
                      margin: "auto",
                      padding: "40px 0",
                    }}
                  >
                    <div>
                      <a href="">Featured</a>
                      <a href="">New Releases</a>
                    </div>
                    <div>
                      <a href="">All Shoes</a>
                      <a href="">Running</a>
                      <a href="">Casual</a>
                      <a href="">Hiking</a>
                    </div>
                    <div>
                      <a href="">Trending</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <Button
                  className="headerButton"
                  style={{
                    textTransform: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Categories
                </Button>
                <div className="dropdown-content">
                  <div
                    className="selection"
                    style={{
                      maxWidth: "1300px",
                      margin: " 20px auto",
                      width: "fit-content",
                      maxHeight: "auto",
                      width: "100%",
                    }}
                  >
                    <h5 style={{ margin: "5px auto", width: "fit-content" }}>
                      Categories
                    </h5>

                    <Filters onClick={() => {}} />
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <Button
                  className="headerButton"
                  style={{
                    textTransform: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Sales
                </Button>
                <div className="dropdown-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "900px",
                      margin: "auto",
                      padding: "40px 0",
                    }}
                  >
                    <div>
                      <a href="">Featured</a>
                      <a href="">Shop All Sale</a>
                    </div>
                    <div>
                      <a href="">Shop for Men</a>
                      <a href="">Shop for Women</a>
                    </div>
                    <div>
                      <a href="">Running</a>
                      <a href="">Hiking</a>
                      <a href="">Casual</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <Button
                  className="headerButton"
                  style={{
                    textTransform: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Admin
                </Button>
                <div className="dropdown-content">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "900px",
                      margin: "auto",
                      padding: "40px 0",
                    }}
                  >
                    <div>
                      <Link href="/admin/orders">All Orders</Link>
                    </div>
                    <div>
                      <Link href="/admin/createProducts">Create a product</Link>
                    </div>
                    <div>
                    <Link href="/admin/allProducts">All Products</Link>
                    </div>
                    <div>
                    <Link href="/admin/stock">Update and edit stock</Link>
                    </div>
                  </div>
                </div>
              </div>
          
            </div>
          </li>
          <li style={{ height: "fit-content", alignSelf: "center" }}>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                justifyContent: "space-around",
                width: "100%",
                padding: "0",
              }}
            >
              {/* <li style={{ alignSelf: "center" }}>
                <Tooltip title="Dark Mode On/Off">
                  <Switch
                    checked={false}
                    onChange={handledarkmodeChange}
                    name="darkMode"
                    color="primary"
                  />
                </Tooltip>
              </li> */}
              <li style={{ height: "fit-content", alignSelf: "center" }}>
                <form onSubmit={(e) => {}}>
                    <InputBase
                      autoComplete="off"
                      // ref={searchBar}
                      name="search"
                      // value={searchQuery}
                      // onChange={changeSearchQuery}
                      placeholder="Search…"
                      style={{
                        margin: "10px auto",
                        backgroundColor: "#e2e2e2",
                        padding: "0px 11px",
                        borderRadius: "20px",
                      }}
                      inputProps={{
                        "aria-label": "search",
                      }}
                      endAdornment={
                        <IconButton size="small" type="submit">
                          <SearchIcon style={{ fill: "black" }} />
                        </IconButton>
                      }
                    />
                  </form>
              </li>
              {isAuthenticated ? (
                <li>
                  <Tooltip title="Profile">
                    <IconButton
                      aria-label="profile"
                      onClick={handleProfileClick}
                    >
                      {typeof user.picture ? (
                        <Avatar
                          src={user?.picture}
                          alt={user?.name}
                          style={{ height: "25px", width: "25px" }}
                        />
                      ) : (
                        <AccountCircleIcon />
                      )}
                    </IconButton>
                  </Tooltip>

                  <Popover
                    open={openProfile}
                    anchorEl={anchorProfileEl}
                    onClose={handleProfileClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div style={{ padding: "5px" }}>
                      <p>Contents</p>
                      <Link className="link" href="/profile">
                        Profile
                      </Link>
                      <LogoutButton />
                    </div>
                  </Popover>
                </li>
              ) : (
                <li style={{ alignSelf: "center", height: "fit-content" }}>
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
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <div style={{ padding: "10px" }}>
                    <div
                      style={{
                        position: "sticky",
                        top: "0px",
                        backgroundColor: "#fff",
                        zIndex: "5",
                      }}
                    >
                      <h1>Shopping Cart</h1>
                      <hr />
                    </div>

                    <ul
                      style={{
                        listStyle: "none",
                        display: "grid",
                        gap: "50px",
                        padding: "0",
                        maxWidth: "100%",
                      }}
                    >
                      {cart?.line_items?.length === 0 ? (
                        <div>
                          <h3>Your Basket is empty</h3>
                          <p>
                            Continue shopping on the{" "}
                            <Link href="/">homepage</Link>, browse our
                            discounts, or visit your Wish List
                          </p>
                        </div>
                      ) : (
                        <div>
                          {cart?.line_items?.map((item) => (
                            <li key={item.id}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  gap: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    backgroundColor: "blue",
                                    height: "100px",
                                    width: "100px",
                                    position: "relative",
                                    overflow: "hidden",
                                  }}
                                >
                                  <Link
                                    href={`/product/${item.product_id}`}
                                    onClick={handleBasketClose}
                                  >
                                    <img
                                      src={item?.media?.source}
                                      width="100"
                                      alt=""
                                      style={{
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                        bottom: "0",
                                        objectFit: "cover",
                                        right: "0",
                                      }}
                                    />
                                  </Link>
                                </div>

                                <div style={{ display: "grid" }}>
                                  <h3
                                    style={{
                                      margin: "0",
                                      width: "fit-content",
                                    }}
                                  >
                                    {item.name}
                                  </h3>
                                  <p
                                    style={{
                                      margin: "0",
                                      width: "fit-content",
                                    }}
                                  >
                                    UK {item?.variants?.[0]?.option_name}{" "}
                                    {item.price?.formatted_with_symbol}
                                  </p>
                                  <p
                                    style={{
                                      margin: "0",
                                      width: "fit-content",
                                    }}
                                  >
                                    Quantity: {item.quantity}
                                  </p>
                                  <div style={{ width: "fit-content" }}>
                                    <Tooltip title="Add 1">
                                      <Button
                                        onClick={() =>
                                          updateItemQty(
                                            item.id,
                                            item.quantity + 1,
                                            item?.variants?.[0]?.variant_id,
                                            item?.variants?.[0]?.option_id
                                          )
                                        }
                                      >
                                        +
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="Remove 1">
                                      <Button
                                        onClick={() =>
                                          updateItemQty(
                                            item.id,
                                            item.quantity - 1,
                                            item?.variants?.[0]?.variant_id,
                                            item?.variants?.[0]?.option_id
                                          )
                                        }
                                      >
                                        -
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="Remove Item">
                                      <IconButton
                                        onClick={() => removeItem(item.id)}
                                      >
                                        <DeleteIcon fontSize="small" />
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
                    <div
                      style={{
                        position: "sticky",
                        bottom: "0",
                        backgroundColor: "#fff",
                      }}
                    >
                      <hr />
                      <div
                        style={{
                          margin: "auto",
                          padding: " 5px 0 10px",
                          width: "fit-content",
                          boxSizing: "border-box",
                          textAlign: "center",
                        }}
                      >
                        <p style={{ margin: "5px 0" }}>
                          Subtotal({cart?.total_items || 0} item
                          {cart?.total_items > 1 && "s"}):{" "}
                          {cart?.subtotal?.formatted_with_symbol}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            gap: "20px",
                          }}
                        >
                          <Link
                            href="/basket"
                            onClick={handleBasketClose}
                            style={{ padding: "0 20px 0 0" }}
                          >
                            Go To Basket
                          </Link>

                          <Link href="/checkout" onClick={handleBasketClose}>
                            Go To Checkout
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div className={`backdrop ${menuOpen && "menuOpen"}`}></div>
    </>
  );
};
