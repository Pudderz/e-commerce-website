import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const TabHeader = styled(Button)`
  width: 100%;
  justify-content: space-between !important;
  min-height: 60px;
  border-radius: 5px;
    /* position:sticky !important;
    z-index:1;
    top:52px; */
    background-color:#fff !important;
    box-shadow: 0px 1px 5px rgb(0, 0, 0, 0.2);
  span {
    text-transform: none;
    width: 100%;
    text-align: start;
    font-size: 1rem;
  }
  &:hover {
    /* border: 1px solid black; */
  }
`;

const TabWrapper = styled.div`
  /* border: 1px solid black; */
  /* padding: 20px; */
  position:relative;
  box-shadow: 0px 1px 5px rgb(0, 0, 0, 0.2);
  border: 1px solid #d6d6d6;
  margin: 10px;
  border-radius: 5px;
  &>div {
    transition: 1s all;
    padding:20px;
    
  }
  .hide {
      height: 0px;
      padding:0px;
      overflow: hidden;
      transition: 1s all;
    }
`;
export const Tab = ({ name, children, id }) => {
  const [min, setMin] = useState(false);

  const handleMinimize = () => setMin((prevState) => !prevState);

  return (
    <TabWrapper id={id}>
      <TabHeader onClick={handleMinimize}>{name}</TabHeader>
      <div className={min && "hide"} >{children}</div>
    </TabWrapper>
  );
};

export default Tab;
