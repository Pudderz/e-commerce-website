import React, { useEffect, useState } from "react";
import { getHistory } from "../../lib/localStorage";
import Link from "next/link";

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
            }}
          >
            <Link href={`/product/${item?.permalink}`}><img
                src={item?.media?.source}
                alt={item?.name}
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  minWidth: "160px",
                }}
              /></Link>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
};
