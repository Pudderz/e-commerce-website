import { Button } from "@material-ui/core";
import styled from "styled-components";

export const ProductImagesWrapper = styled.div`
  display: flex;
  margin: auto;
  max-width: 100%;

  @media (max-width: 1200px) {
    flex-flow: column-reverse;

    div ul {
      display: flex;
      padding: 0;
      justify-content: center;
    }
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  position: relative;
  max-width: 100%;
  justify-content: center;
  img {
    max-width: 700px;
    object-fit: cover;
    margin: 20px 0;
    width: 80%;
    height: auto;
    max-height: 500px;
  }

  @media (max-width: 700px) {
    max-width: 100%;
    button {
      position: absolute;
    }
    img {
      object-fit: contain;
    }
  }
`;

export const ProductList = styled.ul`
  list-style: none;
  max-width: 100%;
  overflow: auto;
  img {
    object-fit: cover;
  }
  @media (max-width: 1200px) {
    display: flex;
    padding: 0;
    justify-content: center;
  }

  @media (max-width: 700px) {
    justify-content:flex-start
  }
`;

export const ImageButtons = styled(Button)`
  font-size: 25px;
  height: fit-content;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  align-self: center;
  position:absolute;
  z-index:1;
`;
