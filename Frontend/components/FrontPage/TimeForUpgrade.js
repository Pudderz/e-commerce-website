import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "@material-ui/core";

const Wrapper = styled.div`
  background-color: #f5f8f8;
  padding: 75px 0;
  display: flex;

  & > div {
    align-self: center;
    width: 100%;
    display: flex;
    flex-flow: column;
    gap: 50px;
  }

  @media (max-width: 500px) {
    padding: 25px 0;
    & > div {
      gap: 10px;
    }
    button span {
      font-size: 17px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  margin: auto;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    button {
      margin: auto;
      max-width: 100%;
    }
  }
`;

export const TimeForUpgrade = () => {
  return (
    <Wrapper>
      <div>
        <h2 style={{ margin: "0", fontSize: "clamp(20px,6vw,40px )" }}>
          Time For An Upgrade
        </h2>
        <ButtonContainer >
          <Link href="/women">
            <Button className="buttonOutlined dark">Shop Women</Button>
          </Link>
          <Link href="/men">
            <Button className="buttonOutlined dark">Shop Men</Button>
          </Link>
          <Link href="/discounts">
            <Button className="buttonOutlined dark">Shop Sales</Button>
          </Link>
        </ButtonContainer>
      </div>
    </Wrapper>
  );
};

export default TimeForUpgrade;
