import React, { useEffect, useState } from "react";
import Link from "next/link";
import runningImage from "../../images/Running.jpg";
import casualImage from "../../images/casual.jpg";
import hikingImage from "../../images/hikingShoes.jpg";
import Image from "next/image";

// ToDo: change this in to media quieries and classnames
export const Categories = () => {

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <h3 style={{ textAlign: "start", padding: "0 20px" }}>Categories</h3>
      {/* <hr/> */}
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
            <div style={{ textDecoration: "solid", cursor: "pointer" }}>
              <img
                src={runningImage}
                alt=""
                // layout="responsive"
                 width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
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
          }}
        >
          <Link href={`/category/casual`}>
            <div style={{ textDecoration: "solid", cursor: "pointer" }}>
              <img
                src={casualImage}
                alt=""
                width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
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
          }}
        >
          <Link href={`/category/hiking`}>
            <div style={{ textDecoration: "solid", cursor: "pointer" }}>
              <img
                src={hikingImage}
                alt=""
                width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
              />
              <h4 className="categoryText">Hiking</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
