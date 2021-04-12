import React from "react";
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
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import { LoginButton } from "../../Authentication/LoginButton";

export const SmallHeader = ({
  isAuthenticated,
  handleBasketClick,
  cartLength,
  displayMenu,
  handleProfileClick,
  user,
}) => {
  const handleBasketClicking = (e) => handleBasketClick(e);
  const handleProfileClicking = (e) => handleProfileClick(e);
  const handleMenu = (e) => displayMenu(e);

  
  return (
    <ul className="smallNav">
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
            <IconButton size="small">
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
    </ul>
  );
};

export default SmallHeader;
