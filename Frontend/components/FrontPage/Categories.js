import React, { useEffect, useState } from "react";
import Link from "next/link";
import runningImage from "../../images/Running.jpg";
import casualImage from "../../images/casual.jpg";
import hikingImage from "../../images/hikingShoes.jpg";
import Image from "next/image";

// ToDo: change this in to media quieries and classnames
export const Categories = ({header}) => {

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <h3 style={{ textAlign: "start", padding: "0 20px" }}>{header || "Categories"}</h3>
      <div className="categoryContainer">
        <div
          className="imageCategoryContainer"
          style={{
            height: "33vh",
            position: "relative",
            minWidth:'33%',
            backgroundColor: "black",
          }}
        >
          <Link href={`/category/running`}>
            <div style={{ textDecoration: "solid", cursor: "pointer", height: "33vh", position: "relative",width:'100%' }}>
              <Image
                src={runningImage}
                alt=""
                // height={6381}
                // width={4253}
                layout="fill"
                objectFit="cover"
                style={{ height: "33vh",  width:"100%" }}
              />
              <h4 className="categoryText">Running</h4>
            </div>
          </Link>
        </div>
        <div
          className="imageCategoryContainer"
          style={{
            // backgroundColor: "#ddd",
            height: "33vh",
            // width: "300px",
            position: "relative",
            backgroundColor: "black",
            minWidth: '33%',
          }}
        >
          <Link href={`/category/casual`}>
            <div style={{ textDecoration: "solid", cursor: "pointer", height: "33vh", minWidth:'100%', position: "relative",  }}>
              {/* <img
                src={casualImage}
                alt=""
                width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
              /> */}
              <Image
                src={casualImage}
                alt=""
                // height={6381}
                // width={4253}
                layout="fill"
                objectFit="cover"
                style={{ height: "33vh",  width:"100%" }}
              />
              <h4 className="categoryText">Casual</h4>
            </div>
          </Link>
        </div>
        <div
          className="imageCategoryContainer"
          style={{
            height: "33vh",
            position: "relative",
            backgroundColor: "black",
            minWidth: '33%',
          }}
        >
          <Link href={`/category/hiking`}>
            <div style={{ textDecoration: "solid", cursor: "pointer", position: "relative",  minWidth:'100%',height:'33vh'}}>
              {/* <img
                src={hikingImage}
                alt=""
                width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
              /> */}
              <Image
                src={hikingImage}
                alt=""
                // height={6381}
                // width={4253}
                layout="fill"
                objectFit="cover"
                style={{ height: "33vh",  width:"100%" }}
              />
              <h4 className="categoryText">Hiking</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
