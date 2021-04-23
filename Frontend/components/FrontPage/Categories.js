import React from "react";
import Link from "next/link";
import runningImage from "images/Running.jpg";
import casualImage from "images/casual.jpg";
import hikingImage from "images/hikingShoes.jpg";
import {
  CategoryContainer,
  Text,
  CategoryWrapper,
  ImageContainer,
  CategoryImage
} from './Categories.styles';


export const Categories = ({ header, gender }) => {
  return (
    <>
      <h3 style={{ textAlign: "start", padding: "0 20px" }}>{header}</h3>
      <CategoryWrapper>
        <CategoryContainer>
          <Link href={`/store?running=true${gender && `&${gender}=true`}`}>
            <ImageContainer>

              <CategoryImage
                src={runningImage}
                alt="a running shoe"
                layout="fill"
                objectFit="cover"
              />
              <Text>Running</Text>

            </ImageContainer>
          </Link>
        </CategoryContainer>
        <CategoryContainer>
          <Link href={`/store?casual=true${gender && `&${gender}=true`}`}>
            <ImageContainer>

              <CategoryImage
                src={casualImage}
                alt=""
                layout="fill"
                objectFit="cover"
              />
              <Text>Casual</Text>

            </ImageContainer>
          </Link>
        </CategoryContainer>

        <CategoryContainer>
          <Link href={`/store?hiking=true${gender && `&${gender}=true`}`}>
            <ImageContainer>

              <CategoryImage
                src={hikingImage}
                alt="a hiking shoe"
                layout="fill"
                objectFit="cover"
              />
              <Text>Hiking</Text>

            </ImageContainer>
          </Link>
        </CategoryContainer>
      </CategoryWrapper>
    </>
  );
};
Categories.defaultProps = {
  gender: "",
  header: "Categories",
};
