import React from "react";
import UrlImage from "../../UrlImage";

function PortfolioItem() {
  return (
    <>
      {item.map((item) => (
        <li key={item.id}>
          <UrlImage src={item.banner} />
        </li>
      ))}
    </>
  );
}

export default PortfolioItem;
