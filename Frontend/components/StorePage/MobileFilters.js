import React, { useState } from "react";
import StoreFilter from "./storeFilter";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton} from "@material-ui/core";

const Wrapper = styled.div`
  position: fixed;
  overflow: auto;
  width: 100%;
  z-index: 2;
  height: 100%;
  top: 0;
  left:0;
  padding: 52px 20px;
  background-color: white;
  &.hide {
    display: none;
  }
  @media(min-width:1200px){
      display:none;
  }
  .smallFilter{
      flex-grow:1;
  }
`;

const CloseButton = styled.div`
position: fixed;
top:50px;
right:5px;
`;

export const MobileFilters = ({handleOpenAndClose, hide}) => {
  const handleClose = () => {
    handleOpenAndClose();
  };
  return (
    <Wrapper className={hide? "hide": ""}>
      <CloseButton>
        <IconButton onClick={handleClose} variant="contained">
            <CloseIcon />
          </IconButton>  
      </CloseButton>
      
      <StoreFilter getProducts={() => {}} />
    </Wrapper>
  );
};
