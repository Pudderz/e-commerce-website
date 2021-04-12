import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { LoginButton } from "../../Authentication/LoginButton";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Tooltip,
  InputBase,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import Filters from "../../StorePage/Filters";
import { useRouter } from "next/router";
export const LargeHeader = ({
  handleMenuOpen,
  handleMenuClose,
  maleTrendingData,
  femaleTrendingData,
  verified,
  isAuthenticated,
  handleBasketClick,
  handleProfileClick,
  cartLength,
  user,
}) => {
  const router = useRouter();

  const handleMenuOpening = () => handleMenuOpen();
  const handleMenuClosing = () => handleMenuClose(false);
  const handleBasketOpening = (e) => handleBasketClick(e);
  const handleProfileOpening = (e) => handleProfileClick(e);

  const handleSearchChange = (ev) => {
    setSearch(ev.target.value);
  };

  const [search, setSearch] = useState("");
  const handleSearch = (ev) => {
    ev.preventDefault();

    // If already on store page adds query to other search queries
    // instead of replacing them
    if (router.pathname === "/store") {
      const urlParams = new URLSearchParams(window.location.search);

      urlParams.set("search", encodeURIComponent(search));
      console.log(urlParams.toString());
      router.replace(`/store?${urlParams.toString()}`, undefined, {
        shallow: true,
      });
    } else {
      router.push({
        pathname: "/store",
        query: { search },
      });
    }
    setSearch("");
  };

  return (
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
          onPointerEnter={handleMenuOpening}
          onPointerLeave={handleMenuClosing}
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
              <div className="dropdownFlexContainer">
                <div>
                  <Link href="/men">Men's Homepage</Link>
                  <Link href="/store?male=true&sortBy=sold">Featured</Link>
                  <Link href="/store?male=true">New Releases</Link>
                </div>
                <div>
                  <Link href="/store?male=true">All Men's Shoes</Link>
                  <Link href="/store?male=true&running=true">
                    Men's Running
                  </Link>
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
              <div className="dropdownFlexContainer">
                <div>
                  <Link href="/women">Women's Homepage</Link>
                  <Link href="/store?female=true&sortBy=sold">Featured</Link>
                  <Link href="/store?female=true">All Women's Shoes</Link>
                </div>
                <div>
                  <Link href="/store?female=true">All Women's Shoes</Link>
                  <Link href="/store?female=true&running=true">
                    Women's Running
                  </Link>
                  <Link href="/store?female=true&casual=true">
                    Women's Casual
                  </Link>
                  <Link href="/store?female=true&hiking=true">
                    Women's Hiking
                  </Link>
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
              <div className="dropdownFlexContainer">
                <div>
                  <Link href="/discounts">Discount HomePage</Link>
                  <Link href="/store?discounted=true">Shop All Discounts</Link>
                </div>
                <div>
                  <Link href="/store?discounted=true&male=true">
                    Discounts for Men
                  </Link>
                  <Link href="/store?discounted=true&female=true">
                    Discounts for Women
                  </Link>
                </div>
                <div>
                  <Link href="/store?discounted=true&running=true">
                    Running
                  </Link>
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
                  className="dropdownFlexContainer"
                  style={{
                    maxWidth: "min(100%,900px)",
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
                <IconButton aria-label="profile" onClick={handleProfileOpening}>
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
              <IconButton aria-label="cart" onClick={handleBasketOpening}>
                <Badge badgeContent={cartLength} color="primary">
                  <ShoppingBasketIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default LargeHeader;
