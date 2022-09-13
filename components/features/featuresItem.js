import React from "react";
import UrlImage from "../../UrlImage";

const FeaturesItem = ({ items }) => {
  return (
    <>
      {" "}
      <div className="col-8 ">
        {items.map((item) => (
          <div key={item.id} className="tech-item ">
            <div className="item-icon  ">
              <UrlImage className="img" src={item.image} />
            </div>
            <div className="item-text ">
              <h4>{item.title}</h4>
              <p
                dangerouslySetInnerHTML={{ __html: item.description ?? "" }}
              ></p>
            </div>
          </div>
        ))}
      </div>
      <div className="col-4"></div>
      {/* {items.map((item) => (
        <div key={item.id} className="tech-item">
          <div className="item-icon">
            <UrlImage src={item.image} />
            <div className="item-text">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))} */}
    </>
  );
};

export default FeaturesItem;
