import Image from "next/image";
import styled from "styled-components";

export const ImageWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: fit-content;
  margin: auto;
  & > div:nth-child(2) {
    position: absolute !important;
    width: 100%;
    left: 0;
    right: 0;
    object-fit: cover;
  }
`;

export const MainImage = styled(Image)`
  max-width: 200px;
  max-height: 300px;
  width: 100%;
  height: 20vh;
  object-fit: cover;
  position: relative;
  z-index: 1;
  &.active {
    z-index: 0;
  }
`;

export const SecondaryImage = styled(Image)`
  position: absolute;
  max-height: 300px;
  max-width: 100%;
  left: 0;
  width: 100%;
  height: 20vh;
  object-fit: cover;
  z-index: 0;
  &.active {
    z-index: 1;
  }
`;