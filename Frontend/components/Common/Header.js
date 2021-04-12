import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import Popover from "@material-ui/core/Popover";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import {
  addCartItem,
  removeCartItem,
  addCartItemQuantity,
} from "../../Redux/actions/actions";
import { useRouter } from "next/router";
import { HeaderBasket } from "./HeaderContent/HeaderBasket";
import { ProfileHeader } from "./HeaderContent/ProfileHeader";
import SmallHeader from "./HeaderContent/smallHeader";
import { LargeHeader } from "./HeaderContent/LargeHeader";

export const Header = (props) => {
  const [anchorBasketEl, setAnchorBasketEl] = useState(null);
  const [anchorProfileEl, setAnchorProfileEl] = useState(null);
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
    props.addCartItemQuantity({
      name,
      size,
      quantity: newQuantity,
    });
  };

  const removeItem = (name, size) => {
    props.removeCartItem({
      name,
      size,
    });
  };

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  const handleMenuClose = () => setMenuOpen(false);

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

    const token = isAuthenticated ? await getAccessTokenSilently() : "";
    console.log(user);
    if (token) {
      const decodeToken = JSON.parse(atob(token.split(".")[1]));
      if (decodeToken.permissions.includes("write:product")) {
        console.log(decodeToken.permissions.includes("write:product"));
        setVerified(true);
      } else if (verified) {
        setVerified(false);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);
  useEffect(() => {
    getTrendingInfo();
    // getToken();
  }, []);

  // close popups on page transition
  useEffect(() => {
    setAnchorBasketEl(null);
    setAnchorProfileEl(null);
  }, [router.pathname]);

  return (
    <>
      <nav className="navBar">
        <SmallHeader
          isAuthenticated={isAuthenticated}
          handleBasketClick={handleBasketClick}
          cartLength={props?.cartState?.cartLength}
          displayMenu={displayMenu}
          handleProfileClick={handleProfileClick}
          user={user}
        />
        <LargeHeader
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          handleProfileClick={handleProfileClick}
          handleBasketClick={handleBasketClick}
          maleTrendingData={maleTrendingData}
          femaleTrendingData={femaleTrendingData}
          verified={verified}
          isAuthenticated={isAuthenticated}
          cartLength={props?.cartState?.cartLength}
          user={user}
        />

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
          style={{ margin: "5px" }}
        >
          <ProfileHeader user={user} />
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
          <HeaderBasket
            updateItemQty={updateItemQty}
            closeBasket={handleBasketClick}
            cart={props?.cartState}
            removeItem={removeItem}
          ></HeaderBasket>
        </Popover>
      </nav>
      <div id="overlay" className={`${menuState.showing}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "min(100%,900px)",
            margin: "auto",
            flexDirection: "column",
            padding: "20px 20px",
            widtH: "100%",
          }}
        >
          <div style={{ width: "100%", textAlign: "start" }}>
            <Button
              endIcon={<MenuIcon />}
              style={{
                width: "100%",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              Home
            </Button>
            <div>
              <Link href="/">Home</Link>
            </div>
          </div>
          <div style={{ width: "100%", textAlign: "start" }}>
            <Link href="/store">Store</Link>
          </div>
          <div style={{ width: "100%", textAlign: "start" }}>
            <Link href="/men">Mens</Link>
          </div>
          <div style={{ width: "100%", textAlign: "start" }}>
            <Link href="/women">Womens</Link>
          </div>
        </div>
      </div>

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
