import React, { useState } from "react";
import StoreFilter from "./storeFilter";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { Button, IconButton } from "@material-ui/core";

const Wrapper = styled.div`
  position: fixed;
  overflow: auto;
  width: 100%;
  z-index: 2;
  height: 100%;
  top: 0;
  left: 0;
  padding: 52px 20px;
  background-color: white;
  &.hide {
    display: none;
  }
  @media (min-width: 1200px) {
    display: none;
  }
  .smallFilter {
    flex-grow: 1;
  }
`;

const CloseButton = styled.div`
  position: fixed;
  top: 50px;
  right: 5px;
`;

const SubmitWrapper = styled.div`
  width: 100vw;
  margin: 0 -20px;
  background-color: white;
  position: fixed;
  bottom: 0;
  box-shadow: 2px -1px 2px rgb(0 0 0 / 20%);
  padding: 10px;
`;

export const MobileFilters = ({
  handleOpenAndClose,
  hide,
  handleSizeFilterChange,
  handleOnSubmit,
  handleFilterChange,
  filters,
  sizes,
}) => {
  const [changesMade, setChangesMade] = useState(false);
  const handleClose = () => {
    handleOpenAndClose();
  };

  const handleSize = (...input) => {
    handleSizeFilterChange(...input);
    setChangesMade(true);
  };

  const handleSubmit = (...input) => {
    handleOnSubmit(...input);
    handleOpenAndClose();
    setChangesMade(false);
  };

  const handleFilter = (...input) => {
    handleFilterChange(...input);
    setChangesMade(true);
  };

  return (
    <Wrapper className={hide ? "hide" : ""}>
      <CloseButton>
        <IconButton onClick={handleClose} variant="contained">
          <CloseIcon />
        </IconButton>
      </CloseButton>

      <StoreFilter
        handleSizeFilterChange={handleSize}
        handleOnSubmit={handleSubmit}
        handleFilterChange={handleFilter}
        filters={filters}
        sizes={sizes}
      />
      {changesMade && (
        <SubmitWrapper>
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
            Apply Changes
          </Button>
        </SubmitWrapper>
      )}
    </Wrapper>
  );
};
