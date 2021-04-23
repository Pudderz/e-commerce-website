import React from "react";
import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #111;
  max-height: min(90vh, 750px);
  width: 100%;
  position: relative;
  padding-bottom: min(56.25%, 750px);
`;

const TextContainer = styled.div`
  position: absolute;
  color: white;
  top: 33%;
  left: 10%;
  font-size: min(40px, 4vw);
  z-index: 1;
  text-align: start;
`;

const ImageContainer = styled.div`
  clip-path: circle(50% at 70% 50%);
  height: 100%;
  position: absolute;
  width: 100%;
`;
export const Banner = ({ children, image }) => (
    <Wrapper>
      <TextContainer>{children}</TextContainer>

      <ImageContainer>
        <Image src={image} layout="fill" objectFit="cover" />
      </ImageContainer>

    </Wrapper>
  );


export default Banner;
