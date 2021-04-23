import styled from "styled-components";
import Image from "next/image";

export const CategoryContainer = styled.div`
  height: 33vh;
  position: relative;
  background-color: black;
  min-width: 33%;
  &:hover {
    img {
      opacity: 0.6;
    }
  }
`;

export const Text = styled.h4`
  text-decoration: none;
  position: absolute;
  top: 40%;
  z-index: 1;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 4vh;
  margin: auto;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 4px;
  justify-content: space-around;
  margin: 20px 0 50px;
  padding: 10px 20px;
  box-sizing: border-box;
  @media (max-width: 1000px) {
    display: grid;
    justify-content: inherit;
    ${CategoryContainer} {
      width: 100%;
    }
  }
`;

export const ImageContainer = styled.div`
  cursor: pointer;
  height: 33vh;
  position: relative;
  width: 100%;
`;

export const CategoryImage = styled(Image)`
  height: 33vh;
  width: 100%;
`;