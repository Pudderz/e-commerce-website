import styled from "styled-components";

export const LargeNav = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  margin: 0;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  height: 100%;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;
  left: 0;
  height: 100%;
  max-height: 0px;
  transition: all 4.15s ease-out;
  -webkit-transition: all 4.15s ease-out;
  -moz-transition: all 4.15s ease-out;
  -ms-transition: all 4.15s ease-out;
  -o-transition: all 4.15s ease-out;
  opacity: 0;
  text-align: start;
  a {
    display: block;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const HeaderButton = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  a {
    text-transform: none;
    background-color: transparent;
    &:hover {
      background-color: transparent;
    }
  }
`;

export const DropdownWrapper = styled.div`
  &:hover {
    ${HeaderButton} {
      border-bottom: 4px solid black;
    }
    ${DropdownContent} {
      display: block;
      background-color: #fff;
      width: 100%;
      max-height: fit-content;
      opacity: 1;
      height: auto;
    }
  }
`;

export const Backdrop = styled.div`
  background-color: hsla(0, 0, 7%, 0.36);
  opacity: 0;
  height: 100%;
  position: fixed;
  z-index: 2;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  //visibility: 0;
  width: 100%;
  pointer-events: none;
  transition: opacity 0.25s, visibility 0s linear 0.25s;
  -webkit-transition: opacity 0.25s, visibility 0s linear 0.25s;
  -moz-transition: opacity 0.25s, visibility 0s linear 0.25s;
  -ms-transition: opacity 0.25s, visibility 0s linear 0.25s;
  -o-transition: opacity 0.25s, visibility 0s linear 0.25s;

  &.menuOpen {
    // visibility: 1;a
    opacity: 1;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: auto;
  padding: 40px 20px;
  box-sizing: border-box;
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  width: 100%;
  padding: 0;
  li {
    height: fit-content;
    align-self: center;
  }
`;

export const CategoriesWrapper = styled.div`
  max-width: 1300px;
  margin: 20px auto;
  width: fit-content;
  max-height: auto;
  width: 100%;

  h5 {
      margin: 5px auto;
      width: fit-content;
  }
`;
