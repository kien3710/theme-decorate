import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { dataoutpanner } from "../data/dataoutpanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function Outpanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <div className="outpanner">
        <h1 className="text">OUT PANNER</h1>
        <Container>
          <div className="panner">
            <Slider {...settings}>
              {dataoutpanner.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <>
                  <img src={item.imgpeople} alt="" />
                </>
              ))}
            </Slider>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Outpanner;
