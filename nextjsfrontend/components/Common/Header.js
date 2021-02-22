import React, { useContext, useState, useEffect } from "react";
import Link from 'next/link'
import { CartContext } from "../../context/CartContext";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Avatar, Badge, Button, IconButton, Tooltip } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Authentication/LoginButton";
import { Switch } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { LogoutButton } from "../Authentication/LogoutButton";
import { fetchCart} from "../../lib/commerce";
import DeleteIcon from "@material-ui/icons/Delete";
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

  const updateItemQty = (id, newQuantity) => {
    updateQty(id, newQuantity);
  };

  const removeItem = (id)=> removeFromCart(id);

  const handledarkmodeChange = () => {};
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        // backgroundColor: "rgba(0,0,0,0.6)",
        backgroundColor: "#fff",
        boxShadow: "rgb(0 0 0) 0px -17px 26px",
        padding: "10px 0",
        margin: "0",
        zIndex: "2",
      }}
    >
      <nav style={{ zIndex: "2" }}>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            justifyContent: "space-between",
            margin: "0",
            maxWidth: "100%",
            boxSizing: "border-box",
            padding: "0 20px",
          }}
        >
          <li>
            <div style={{ display: "flex", gap: "20px", margin: "10px 0" }}>
              <Link className="link" href="/">
                Home
              </Link>
              <Link className="link" href="/store">
                Store
              </Link>
            </div>
          </li>

          <li>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                justifyContent: "space-around",
                width: "100%",
                padding: "0",
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
                            <Link to="/">homepage</Link>, browse our discounts,
                            or visit your Wish List
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
                                     UK {item?.variants?.[0]?.option_name} {item.price?.formatted_with_symbol}
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
                                          updateItemQty(item.id, item.quantity + 1)
                                        }
                                      >
                                        +
                                      </Button>
                                    </Tooltip>
                                    <Tooltip title="Remove 1">
                                      <Button
                                        onClick={() =>
                                          updateItemQty(item.id, item.quantity - 1)
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
                </Popover>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};
