import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import Link from "next/link";
import { Container } from "@mui/system";
import Image from "next/image";
import { BsBehance, BsFacebook } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import UrlImage from "../UrlImage";
export default function Detail() {
  const router = useRouter();
  const params = router.query.id;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const getdetail = collection(db, "projects");

    if (!getdetail.empty) {
      onSnapshot(
        getdetail,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setDetail([...docs]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);
  console.log("detail", detail);

  const [stickyScroll, setStickyScroll] = useState("relative");

  useEffect(() => {
    window.addEventListener("scroll", stickNavba);

    return () => {
      window.removeEventListener("scroll", stickNavba);
    };
  }, []);
  const stickNavba = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 300
        ? setStickyScroll("fixed top-0 left-0 z-50 w-100   ")
        : setStickyScroll("relative");
    }
  };
  const Content = (props) => {
    const { ite, pro, lik, imas } = props;
    console.log(ite, "datdai");

    return (
      <>
        <div className="id">
          {" "}
          <UrlImage className="img_banner" src={imas.banner} />
          <div className="close" onClick={() => router.push("/")}>
            <AiOutlinePlus className="" />
          </div>
          <div className="overlay"></div>
          <Container>
            <>
              <h1 className="title">
                {pro.title} <br />
                <h5>
                  <a href={lik.link.link}>{lik.link.link}</a>
                  {/* <a href="https://www.marithmetic.com/">www.marithmetic.com</a> */}
                </h5>
              </h1>

              {/* {pro?.map((item) => {
                return (
                  <>
                    <h1 key={item.id} className="title">
                      {item.title}
                    </h1>
                  </>
                );
              })} */}
            </>
          </Container>
          <div className={`h-16 w-full bg-gray-200 ${stickyScroll} banner`}>
            <div className="left"></div>
            <div className="center"></div>
            <div className="right"> </div>
          </div>
        </div>
        <Container>
          <div className="content">
            <ul>
              {ite?.map((item) => {
                return (
                  <>
                    <li className="content-item">
                      <h1>{item.title}</h1>

                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.description ?? "",
                        }}
                      ></p>
                    </li>
                  </>
                );
              })}
              {/* <li className="content-item">
                <h1>WHAT WE DID</h1>
                <p>Strategy, UX/UI Design and Interaction Design</p>
              </li>
              <li className="content-item">
                <h1>WHAT WE DID</h1>
                <p>Strategy, UX/UI Design and Interaction Design</p>
              </li>
              <li className="content-item">
                <h1>WHAT WE DID</h1>
                <p>Strategy, UX/UI Design and Interaction Design</p>
              </li>
              <li className="content-item">
                <h1>WHAT WE DID</h1>
                <p>Strategy, UX/UI Design and Interaction Design</p>
              </li> */}
            </ul>
          </div>
        </Container>
        <div className="projects">
          <div className="title">
            <h1>More projects</h1>
            <ul className="projects-item">
              <li className="item__1">
                <div className="hovers">
                  <h1>TOP MOT</h1>
                  <button
                    onClick={() => router.push("I1vjJkX4yd1qy4rs0lhp")}
                    className="hover_projects"
                  >
                    E-conmerce
                  </button>
                </div>
              </li>
              <li className="item__2">
                {" "}
                <div className="hovers">
                  <h1> MASSPA</h1>
                  <button
                    onClick={() => router.push("SoTIUzTfKFxgaowtAE6L")}
                    className="hover_projects"
                  >
                    Website and Mobile app
                  </button>
                </div>
              </li>
              <li className="item__3">
                {" "}
                <div className="hovers">
                  <h1>E-Thinkcard</h1>
                  <button
                    onClick={() => router.push("rSfV6WgVsTUBSzvi88EV")}
                    className="hover_projects"
                  >
                    Mobile app
                  </button>
                </div>
              </li>
              <li className="item__4">
                {" "}
                <div className="hovers">
                  <h1>ORI MART</h1>
                  <button
                    onClick={() => router.push("eibWhUQZR4567aYsuNew")}
                    className="hover_projects"
                  >
                    E-conmerce
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer_project">
          <Container className="footer__project">
            <div className="project_item item1">
              {" "}
              <h1>
                THINKTODO <br />
                SINCE2019.
              </h1>
            </div>
            <div className="project_item item2">
              <div className="icon_footer">
                <BsFacebook />
                <BsBehance />
              </div>
              <h5>
                All copyrights reserved © 2019 - Designed & Developed by
                THINKTODO
              </h5>
            </div>
          </Container>
        </div>
      </>
    );
  };
  return (
    <>
      {detail &&
        detail
          .filter((e) => e.id?.includes(params))
          .map((ite) => (
            <>
              <Content
                ite={ite.description}
                pro={ite}
                lik={ite}
                imas={ite.image}
              />
            </>
          ))}
    </>
  );
}
