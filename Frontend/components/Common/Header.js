import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Avatar, Badge, Button, IconButton, Tooltip } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Authentication/LoginButton";
import Popover from "@material-ui/core/Popover";
import { LogoutButton } from "../Authentication/LogoutButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import {
  addCartItem,
  removeCartItem,
  addCartItemQuantity,
} from "../../Redux/actions/actions";
import { useRouter } from "next/router";
import { Filters } from "../StorePage/Filters";

export const Header = (props) => {
  const [anchorBasketEl, setAnchorBasketEl] = useState(null);
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [maleTrendingData, setMaleTrendingData] = useState([]);
  const [femaleTrendingData, setFemaleTrendingData] = useState([]);
  const router = useRouter();
  const [menuState, setShowMenu] = useState({
    showing: "",
    hamburger: "",
  });
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const menuShowingRef = useRef(false);

  const displayMenu = () => {
    menuShowingRef.current = menuState.showing === "none";

    setShowMenu({
      showing: menuState.showing === "" ? "showing" : "",
      hamburger: menuState.showing === "" ? "change" : "",
    });
  };

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

  const updateItemQty = (name, size, newQuantity) => {
    console.log(name, size, newQuantity);
    props.addCartItemQuantity({
      name,
      size,
      quantity: newQuantity,
    });
  };

  const removeItem = (name, size) => {
    console.log(name, size);
    props.removeCartItem({
      name,
      size,
    });
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleMenuClose = () => setMenuOpen(false);

  const handleSearch = (ev) => {
    ev.preventDefault();
    console.log(search);

    console.log(router.pathname);
    if(router.pathname ==="/store"){
      const urlParams = new URLSearchParams(window.location.search);
      
        urlParams.set("search", encodeURIComponent(search));
      console.log(urlParams.toString())
      router.replace(`/store?${urlParams.toString()}`, undefined, {shallow: true})
    }else{
      router.push({
        pathname: "/store",
        query: { search },
      });
    }
    setSearch("");
  };

  const handleSearchChange = (ev) => {
    setSearch(ev.target.value);
  };

  const getTrendingInfo = () => {
    fetch(`${process.env.BACKEND_SERVER}/trendingHeader`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.maleData) setMaleTrendingData(data.maleData);
        if (data.femaleData) setFemaleTrendingData(data.femaleData);
      });
  };

  const [verified, setVerified] = useState(false);

  // temp using access token. Will move to id token in future
  const getToken = async () => {
    // const claims = await getIdTokenClaims();

    const token = (isAuthenticated)? await getAccessTokenSilently(): "";
    console.log(user)
    if (token) {
      const decodeToken = JSON.parse(atob(token.split(".")[1]));
      if (decodeToken.permissions.includes("write:product")) {
        console.log(decodeToken.permissions.includes("write:product"));
        setVerified(true);
      }else if(verified){
        setVerified(false);
      }
    }
  };


  useEffect(() => {
    
    getToken()
  }, [getAccessTokenSilently, isAuthenticated])
  useEffect(() => {
    getTrendingInfo();
    // getToken();
  }, []);

// close popups on page transition
  useEffect(()=>{
    setAnchorBasketEl(null);
    setAnchorProfileEl(null);
  },[router.pathname])

  return (
    <>
      <nav className="navBar">
        <ul className="smallNav">
          <li style={{display: 'flex',
    alignItems: 'center'}}>
            <Link className="link" href="/">
              Home
            </Link>
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
              <li style={{ height: "fit-content", alignSelf: "center" }}>
                <IconButton size="small">
                  <SearchIcon style={{ fill: "black" }} />
                </IconButton>
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
                </li>
              ) : (
                <li style={{ alignSelf: "center", height: "fit-content" }}>
                  <LoginButton />
                </li>
              )}

              <li>
                <Tooltip title="Basket">
                  <IconButton aria-label="cart" onClick={handleBasketClick}>
                    <Badge
                      badgeContent={props?.cartState?.length}
                      color="primary"
                    >
                      <ShoppingBasketIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
              <li style={{ height: "fit-content", alignSelf: "center" }}>
                <IconButton
                onClick={displayMenu}
                onKeyDown={displayMenu}
                >
                <MenuIcon/> 
                </IconButton>
               
              </li>
            </ul>
          </li>
        </ul>
        <ul className="largeNav">
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
                <div
                  className="headerButton"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Link href="/men">
                    <a
                      className="MuiButton-root"
                      style={{
                        textTransform: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      Men
                    </a>
                  </Link>
                </div>

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
                      <Link href="/men">Men's Homepage</Link>
                      <Link href="/store?male=true&sortBy=sold">Featured</Link>
                      <Link href="/store?male=true">New Releases</Link>
                    </div>
                    <div>
                    <Link href="/store?male=true">All Men's Shoes</Link>
                    <Link href="/store?male=true&running=true">Men's Running</Link>
                    <Link href="/store?male=true&casual=true">Men's Casual</Link>
                    <Link href="/store?male=true&hiking=true">Men's Hiking</Link>
                    </div>
                    <div>
                      <h5 style={{ margin: "0" }}>Trending</h5>
                      <ul style={{ listStyle: "none", padding: "0" }}>
                        {maleTrendingData.map((product) => (
                          <li key={product._id}>
                            <Link href={`/product/${product.slug}`}>
                              {product.productName}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <div
                  className="headerButton"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Link href="/women">
                    <a
                      className="MuiButton-root"
                      style={{
                        textTransform: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      Women
                    </a>
                  </Link>
                </div>
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
                      <Link href="/women">Women's Homepage</Link>
                      <Link href="/store?female=true&sortBy=sold">All Women's Shoes</Link>
                      <Link href="/store?female=true">All Women's Shoes</Link>
                    </div>
                    <div>
                    <Link href="/store?female=true">All Women's Shoes</Link>
                    <Link href="/store?female=true&running=true">Women's Running</Link>
                    <Link href="/store?female=true&casual=true">Women's Casual</Link>
                    <Link href="/store?female=true&hiking=true">Women's Hiking</Link>
                    </div>
                    <div>
                      <h5 style={{ margin: "0" }}>Trending</h5>
                      <ul style={{ listStyle: "none", padding: "0" }}>
                        {femaleTrendingData.map((product) => (
                          <li key={product._id}>
                            <Link href={`/product/${product.slug}`}>
                              {product.productName}
                            </Link>
                          </li>
                        ))}
                      </ul>
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
                <div
                  className="headerButton"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Link href="/discounts">
                    <a
                      className="MuiButton-root"
                      style={{
                        textTransform: "none",
                        backgroundColor: "transparent",
                      }}
                    >
                      Sales
                    </a>
                  </Link>
                </div>
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
                    <Link href="/discounts">Discount HomePage</Link>
                    <Link href="/store?discounted=true">Shop All Discounts</Link>
                    </div>
                    <div>
                      <Link href="/store?discounted=true&male=true">Discounts for Men</Link>
                    <Link href="/store?discounted=true&female=true">Discounts for Women</Link>
                    </div>
                    <div>
                    <Link href="/store?discounted=true&running=true">Running</Link>
                    <Link href="/store?discounted=true&hiking=true">Hiking</Link>
                    <Link href="/store?discounted=true&casual=true">Casual</Link>
                    </div>
                  </div>
                </div>
              </div>

              {verified && (
                <div className="dropdown">
                  <div
                    className="headerButton"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Link href="/admin">
                      <a
                        className="MuiButton-root"
                        style={{
                          textTransform: "none",
                          backgroundColor: "transparent",
                        }}
                      >
                        Admin
                      </a>
                    </Link>
                  </div>
                  <div className="dropdown-content">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: "min(100%,900px)",
                        margin: "auto",
                        padding: "40px 0",
                      }}
                    >
                      <div>
                        <Link href="/admin/orders">All Orders</Link>
                      </div>
                      <div>
                        <Link href="/admin/createProducts">
                          Create a product
                        </Link>
                      </div>
                      <div>
                        <Link href="/admin/allProducts">All Products</Link>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}
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
              <li style={{ height: "fit-content", alignSelf: "center" }}>
                <form onSubmit={handleSearch}>
                  <InputBase
                    autoComplete="off"
                    name="search"
                    value={search}
                    onChange={handleSearchChange}
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
                </li>
              ) : (
                <li style={{ alignSelf: "center", height: "fit-content" }}>
                  <LoginButton />
                </li>
              )}

              <li>
                <Tooltip title="Basket">
                  <IconButton aria-label="cart" onClick={handleBasketClick}>
                    <Badge
                      badgeContent={props?.cartState?.length}
                      color="primary"
                    >
                      <ShoppingBasketIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </li>
        </ul>

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
              {props?.cartState?.length === 0 ? (
                <div>
                  <h3>Your Basket is empty</h3>
                  <p>
                    Continue shopping on the <Link href="/">homepage</Link>,
                    browse our discounts, or visit your Wish List
                  </p>
                </div>
              ) : (
                <div>
                  {props?.cartState?.map((item) => (
                    <li key={`${item.id}${item.size}`}>
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
                            href={`/product/${item.slug}`}
                            onClick={handleBasketClose}
                          >
                            <img
                              src={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item?.images[0]}`}
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
                            UK {item?.size} £{item?.price}.00
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
                                    item.name,
                                    item.size,
                                    item.quantity + 1
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
                                    item.name,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                            </Tooltip>
                            <Tooltip title="Remove Item">
                              <IconButton
                                onClick={() => removeItem(item.name, item.size)}
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
                  {/* Subtotal({cart?.total_items || 0} item
                          {cart?.total_items > 1 && "s"}):{" "}
                          {cart?.subtotal?.formatted_with_symbol} */}
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
      </nav>
      <div id="overlay" className={`${menuState.showing}`}>
        <Link href="/">Home</Link>
        <Link href="/store">Store</Link>
        <Link href="/men">Mens</Link>
        <Link href="/women">Womens</Link>
      </div>
      {/* blur background when access menu */}
      <div className={`backdrop ${menuOpen && "menuOpen"}`}></div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
  cartState: state.cart.cart,
  cartInfo: state.cart.cartInfo,
  props: { ...ownProps },
});

const mapDispatchToProps = {
  addCartItem,
  removeCartItem,
  addCartItemQuantity,
  // ... normally is an object full of action creators
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
