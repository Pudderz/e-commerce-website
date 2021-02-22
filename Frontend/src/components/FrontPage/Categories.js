import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import runningImage from "../../images/Running.jpg";
import casualImage from "../../images/casual.jpg";
import hikingImage from "../../images/hikingShoes.jpg";


// ToDo: change this in to media quieries and classnames
export const Categories = () => {
  const [isSmallDisplay, setIsSmallDisplay] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsSmallDisplay(true);
    } else {
      setIsSmallDisplay(false);
    }
    window.addEventListener("resize", (e) => {
      console.log(window.innerWidth);
      if (window.innerWidth < 1000 && isSmallDisplay === false) {
        setIsSmallDisplay(true);
      } else if (window.innerWidth >= 1000 && isSmallDisplay === true) {
        setIsSmallDisplay(false);
      }
    });
    return () => {
      window.removeEventListener("resize", (e) => {
        console.log(window.innerWidth);
        if (window.innerWidth < 1000 && isSmallDisplay === false) {
          setIsSmallDisplay(true);
        } else if (window.innerWidth >= 1000 && isSmallDisplay === true) {
          setIsSmallDisplay(false);
        }
      });
    };
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#fff",
        // minHeight: "800px",
        width: "100%",
        // paddingTop: "100px",
      }}
    >
      <h2>Categories</h2>

      {isSmallDisplay ? (
        <div
          style={{
            display: "grid",
            justifyContent: "space-around",
            gap: "4px",
            margin: "20px 0 50px",
            padding: "40px 20px",
            boxSizing: "border-box",
            
          }}
        >
          <div
          className="imageCategoryContainer"
            style={{
              //  backgroundColor: "#ddd",
              height: "33vh",
              // width: "300px",
              position:'relative',
              backgroundColor:'black'
            }}
          >
            <Link
              to={{
                pathname: "/category",
                search: `?category=running`,
              }}
              style={{ textDecoration: "solid" }}
            >
              <img
                src={runningImage}
                alt=""
                width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
              />
              <h4 
              className="categoryText"
              >
                Running
              </h4>
            </Link>
          </div>
          <div
          className="imageCategoryContainer"
            style={{
              // backgroundColor: "#ddd",
              height: "33vh",
              // width: "300px",
              position:'relative',
              backgroundColor:'black'
            }}
          >
            <Link
              to={{
                pathname: "/category",
                search: `?category=casual`,
              }}
              style={{ textDecoration: "solid" }}
            >
              <img
                src={casualImage}
                alt=""
                width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
              />
              <h4 
               className="categoryText"
              >Casual</h4>
            </Link>
          </div>
          <div 
          className="imageCategoryContainer"
          style={{ height: "33vh", position: "relative", backgroundColor:'black' }}>
            <Link
              to={{
                pathname: "/category",
                search: `?category=hiking`,
              }}
              style={{ textDecoration: "solid" }}
            >
              <img
                src={hikingImage}
                alt=""
                width="100%"
                style={{ objectFit: "cover", height: "33vh" }}
              />
              <h4
               className="categoryText"
               
              >
                Hiking
              </h4>
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "30px",
            margin: "20px 0",
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              //  backgroundColor: "#ddd",
              height: "600px",
              width: "300px",
            }}
          >
            <Link
              to={{
                pathname: "/category",
                search: `?category=running`,
              }}
              style={{ textDecoration: "solid" }}
            >
              <img src={runningImage} alt="" width="100%" />
              <h4 style={{ textDecoration: "none", color: "black" }}>
                Running
              </h4>
            </Link>
          </div>
          <div
            style={{
              // backgroundColor: "#ddd",
              height: "600px",
              width: "300px",
              marginTop: "50px",
            }}
          >
            <Link
              to={{
                pathname: "/category",
                search: `?category=casual`,
              }}
              style={{ textDecoration: "solid" }}
            >
              <img src={casualImage} alt="" width="100%" />
              <h4 style={{ textDecoration: "none", color: "black" }}>Casual</h4>
            </Link>
          </div>
          <div style={{ height: "600px", width: "300px" }}>
            <Link
              to={{
                pathname: "/category",
                search: `?category=hiking`,
              }}
              style={{ textDecoration: "solid" }}
            >
              <img src={hikingImage} alt="" width="100%" />
              <h4 style={{ textDecoration: "none", color: "black" }}>Hiking</h4>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
