import styled from "styled-components";

const sliderWidth = "100vw";
const sliderHeight = "75px";

export const SlideContainer = styled.div`
  display: flex;
  position: relative;
  top: 0;
  left: -${sliderWidth};
  width: 8*${sliderWidth};
`

export const Slide = styled.span`
  width: ${sliderWidth};
  height: ${sliderHeight};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* transition: all 1s; */
  position: relative;
  border-radius: 2px;
  font-size: min(20px, 4vw);
  margin: 0;
  align-self: center;
`;
export const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: ${sliderWidth};
  height: ${sliderHeight};
  z-index: 0;
  max-width: 100%;
`;

export const Buttons = styled.a`
  position: absolute;
  top: 50%;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50px;
  margin-top: -20px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
  background-size: 22px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  @media (max-width: 700px){
    display:none;
  }
`;
