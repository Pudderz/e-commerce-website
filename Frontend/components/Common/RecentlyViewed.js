import React, { useEffect, useState } from "react";
import { getHistory } from "../../lib/localStorage";
import Link from "next/link";
import { ItemImage } from "./ItemImage";

export const RecentlyViewed = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div>
      <hr />
      <h3 style={{ textAlign: "start" }}>Recently Viewed</h3>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "20px",
          overflowX: "auto",
          overflowY: "hidden",
          padding: " 0 20px 10px",
          justifyContent: "start",
          maxHeight: "20vh",
          position: "relative",
        }}
      >
        {history.map((item, index) => (
          <li
            key={index}
            style={{
              boxSizing: "border-box",
              maxHeight: "100%",
              width: "fit-content",
              minWidth:'100px'
            }}
          >
            <ItemImage
              id={item.id || item._id}
              name={item.name || item.productName}
              firstImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[0]}`}
              secondImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[1]}`}
              link={ item.slug}
            />
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};
