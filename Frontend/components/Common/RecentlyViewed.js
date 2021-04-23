import React, { useEffect, useState } from "react";
import { getHistory } from "../../lib/localStorage";
import { ItemImage } from "./ItemImage";
import styled from "styled-components";

const HistoryList = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 20px 10px;
  justify-content: start;
  max-height: 20vh;
  position: relative;

  li {
    box-sizing: border-box;
    max-height: 100%;
    min-width: 100px;
    min-height: 100px;
    width: fit-content;
  }
`;

export const RecentlyViewed = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div>
      <hr />
      <h3 style={{ textAlign: "start" }}>Recently Viewed</h3>
      <HistoryList>
        {history.map((item, index) => (
          <li key={index}>
            <ItemImage
              id={item.id || item._id}
              name={item.name || item.productName}
              firstImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[0]}`}
              secondImage={`${process.env.GOOGLE_CLOUD_PUBLIC_URL}${item.images?.[1]}`}
              link={item.slug}
            />
          </li>
        ))}
      </HistoryList>
      <hr />
    </div>
  );
};
