import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { LoginButton } from "../../Authentication/LoginButton";
import SearchIcon from "@material-ui/icons/Search";
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
import AllCategories from "../../StorePage/AllCategories";
import { useRouter } from "next/router";
import {
  CategoriesWrapper,
  DropdownContent,
  DropdownWrapper,
  FlexContainer,
  HeaderButton,
  LargeNav,
  NavItems,
} from "./LargeHeader.styles";

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
    <LargeNav>
      <li>
        <div
          style={{
            display: "flex",
            gap: "20px",
            margin: "10px 0",
            height: "100%",
          }}
        >
          <Link className="link" href="/" style={{ height: "fit-content" }}>
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
          <DropdownWrapper className="dropdown">
            <HeaderButton>
              <Link href="/men">
                <a className="MuiButton-root">Men</a>
              </Link>
            </HeaderButton>

            <DropdownContent className="dropdown-content">
              <FlexContainer>
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
              </FlexContainer>
            </DropdownContent>
          </DropdownWrapper>
          <DropdownWrapper>
            <HeaderButton>
              <Link href="/women">
                <a className="MuiButton-root">Women</a>
              </Link>
            </HeaderButton>
            <DropdownContent>
              <FlexContainer>
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
              </FlexContainer>
            </DropdownContent>
          </DropdownWrapper>
          <DropdownWrapper>
            <Button
              className="headerButton"
              style={{
                textTransform: "none",
                backgroundColor: "transparent",
              }}
            >
              Categories
            </Button>
            <DropdownContent>

              <CategoriesWrapper>
                <h5>Categories</h5>
                <AllCategories onClick={() => {}} />
              </CategoriesWrapper>
              
            </DropdownContent>
          </DropdownWrapper>
          <DropdownWrapper>
            <HeaderButton>
              <Link href="/discounts">
                <a className="MuiButton-root">Sales</a>
              </Link>
            </HeaderButton>
            <DropdownContent>
              <FlexContainer>
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
              </FlexContainer>
            </DropdownContent>
          </DropdownWrapper>

          {verified && (
            <DropdownWrapper>
              <HeaderButton>
                <Link href="/admin">
                  <a className="MuiButton-root">Admin</a>
                </Link>
              </HeaderButton>
              <DropdownContent>
                <FlexContainer
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
                </FlexContainer>
              </DropdownContent>
            </DropdownWrapper>
          )}
        </div>
      </li>
      <li style={{ height: "fit-content", alignSelf: "center" }}>
        <NavItems>
          <li>
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
            <li>
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
        </NavItems>
      </li>
    </LargeNav>
  );
};

export default LargeHeader;
