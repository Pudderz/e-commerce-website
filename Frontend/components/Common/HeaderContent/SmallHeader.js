import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Tooltip,
  InputBase,
  ClickAwayListener
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import { LoginButton } from "../../Authentication/LoginButton";
import { useRouter } from "next/router";

export const SmallHeader = ({
  isAuthenticated,
  handleBasketClick,
  cartLength,
  displayMenu,
  handleProfileClick,
  user,
}) => {
  const router = useRouter();
  const handleBasketClicking = (e) => handleBasketClick(e);
  const handleProfileClicking = (e) => handleProfileClick(e);
  const handleMenu = (e) => displayMenu(e);

  const [searchVisiblity, setSearchVisibilty] = useState(false);

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
    setSearchVisibilty(false);
  };

  const handleSearchOpen = () => {
    setSearchVisibilty(true);
  };

  const handleSearchClose = () =>{
    setSearchVisibilty(false);
  }
  return (
    <ul className="smallNav" style={{justifyContent:(searchVisiblity)? "content": "space-between"}}>
      {!searchVisiblity ? (
        <>
      <li style={{ display: "flex", alignItems: "center" }}>
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
              <IconButton size="small" onClick={handleSearchOpen}>
                <SearchIcon style={{ fill: "black" }} />
              </IconButton>
            </li>
            {isAuthenticated ? (
              <li>
                <Tooltip title="Profile">
                  <IconButton
                    aria-label="profile"
                    onClick={handleProfileClicking}
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
                <IconButton aria-label="cart" onClick={handleBasketClicking}>
                  <Badge badgeContent={cartLength} color="primary">
                    <ShoppingBasketIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li>
            <li style={{ height: "fit-content", alignSelf: "center" }}>
              <IconButton onClick={handleMenu} onKeyDown={handleMenu}>
                <MenuIcon />
              </IconButton>
            </li>
          </ul>
      

   
      </li>  
      </>
      ) : (
      <li style={{width:'100%'}}>
      <ClickAwayListener onClickAway={handleSearchClose}>
            <form onSubmit={handleSearch} >
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
                maxWidth:'80%',
                width:'100%',
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
            <IconButton size="small" onClick={handleSearchClose} style={{maxWidth:'15%'}}>
                <CloseIcon style={{ fill: "black" }} />
              </IconButton>
          </form>
          
          </ClickAwayListener>
          
      </li>
    
           )}
    </ul>
  );
};

export default SmallHeader;
