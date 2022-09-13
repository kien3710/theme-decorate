import React from "react";
import Image from "next/image";
import choose from "../public/image/choose-1.jpg";
import { Container } from "@mui/system";
function Choose() {
  return (
    <div>
      <Container>
        <div className="choose">
          <div className="choose-item ">
            <div className="ig"></div>
          </div>
          <div className="choose-item">
            <h1>WHY CHOOSE US ?</h1>
            <h2>
              Architecture & Interior Design offers a wide range of services for
              our clients, including:
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>Spadding-bottom: 30px;</li>
              <li>New construction & Interior design</li>
              <li>Comfortable Apartment</li>
              <li>very project delivered as one</li>
              <li>Complete 24/7 Security</li>
              <li>Space planning & Master planning</li>
            </ul>
          </div>
        </div>

        <div className="choose-2">
          <div className="choose-item">
            <h1>WHY CHOOSE US ?</h1>
            <h2>
              Architecture & Interior Design offers a wide range of services for
              our clients, including:
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>Spadding-bottom: 30px;</li>
              <li>New construction & Interior design</li>
              <li>Comfortable Apartment</li>
              <li>very project delivered as one</li>
              <li>Complete 24/7 Security</li>
              <li>Space planning & Master planning</li>
            </ul>
          </div>
          <div className="choose-item ">
            <div className="ig"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Choose;
