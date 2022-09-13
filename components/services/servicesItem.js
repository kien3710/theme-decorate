import React from "react";
import UrlImage from "../../UrlImage";

const ServicesItem = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <li key={item.id}>
          {" "}
          <div className="icon">
            <UrlImage src={item.image} />
          </div>
          <h2 className="title">{item.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: item.description ?? "" }}></p>
        </li>
      ))}
    </>
  );
};

export default ServicesItem;
