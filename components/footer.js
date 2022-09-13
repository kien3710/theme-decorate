/* eslint-disable @next/next/no-img-element */
import { Container } from "@mui/system";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsBehance, BsFacebook } from "react-icons/bs";
function Footer() {
  return (
    <div>
      <div className="footer" id="contact">
        <Container>
          <ul>
            <li>
              <h1 className="text-contact">Contact With Us</h1>
              <p>
                27 Hoang Hoa Tham street, Binh Thanh district, Ho Chi Minh city
              </p>
              <p className="phone">
                Phone: <a href="">+84 90 8184 981</a>
              </p>
              <p className="email">
                Email: <a href="">think2do.contact@gmail.com</a>
              </p>
              <div className="icon">
                <a href="https://www.facebook.com/think2do">
                  {" "}
                  <BsFacebook className="item_icon" />
                </a>
                <a href="https://www.behance.net/thinktodond545">
                  {" "}
                  <BsBehance className="item_icon" />
                </a>
              </div>
            </li>
            <li>
              <form
                action="
              "
              >
                <label
                  htmlFor="Name
                "
                >
                  Name
                </label>
                <input type="text" placeholder="Your Name" />

                <br />
                <label
                  htmlFor="Email
                "
                >
                  Email
                </label>
                <input type="text" placeholder="Your Email" />
                <br />
                <label
                  htmlFor="Message
                "
                >
                  Message
                </label>
                <input type="text" placeholder="Your Message" />
              </form>
              <button>
                <h1>MESSENGER</h1>
              </button>
            </li>
          </ul>
        </Container>
      </div>
    </div>
  );
}

export default Footer;
