import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Row, Button } from "reactstrap";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import UrlImage from "../../UrlImage";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { connect } from "react-redux";
function Portfolio({ language, setLanguage }) {
  const [portfolio, setPortfolio] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [title, setTitle] = useState([]);
  useEffect(() => {
    const getDataPort = collection(db, "project_section");

    if (!getDataPort.empty) {
      onSnapshot(
        getDataPort,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `project_section/${doc.id}/projects_section_locales`
              );

              onSnapshot(localeCollections, (snap) => {
                const snapshoted = snap.docs
                  .map((v) => ({ ...v.data(), id: v.id }))
                  .reduce((prev, current) => {
                    return {
                      ...prev,
                      [doc.id]: current,
                    };
                  }, {});
                resolve(snapshoted);
              });
            });
          });
          Promise.all(promisesDocs).then((locales) => {
            const results = docs.map((portfolio) => {
              const localesOfPortfolio = locales.find((locale) => {
                return !!locale[portfolio.id];
              });

              return {
                ...portfolio,
                locales: {
                  vi: Object.values(localesOfPortfolio).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: portfolio,
                },
              };
            });

            setTitle(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const getDataPort = collection(db, "projects");

    if (!getDataPort.empty) {
      onSnapshot(
        getDataPort,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setPortfolio([...docs]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  const handleOnclick = (index) => {
    // setActiveIndex()
    setActiveIndex(index);
  };
  const setText = (indexx) => {};
  console.log("port", portfolio);
  const ButtonTab = () => {
    return (
      <>
        <div
          id="projects"
          className="buttons d-flex  justify-content-center pb-5"
        >
          <button
            className={
              activeIndex === 0
                ? "btn btn-outline-primary me-2 cc"
                : "btn btn-outline-primary me-2"
            }
            onClick={() => [setFilter("all"), handleOnclick(0), setText("phu")]}
          >
            all
          </button>
          <button
            className={
              activeIndex === 1
                ? "btn btn-outline-primary me-2 cc"
                : "btn btn-outline-primary me-2"
            }
            onClick={() => [
              setFilter("website"),
              handleOnclick(1),
              setText("kien"),
            ]}
          >
            website
          </button>
          <button
            className={
              activeIndex === 2
                ? "btn btn-outline-primary me-2 cc"
                : "btn btn-outline-primary me-2"
            }
            onClick={() => [
              setFilter("mobile"),
              handleOnclick(2),
              setText("trong"),
            ]}
          >
            mobile
          </button>
        </div>
      </>
    );
  };
  return (
    <div>
      <Container>
        <Row className="portfolio_all">
          <>
            <div className="title_portfolio">
              {title.map((item) => {
                const withPortfolio = item.locales[language];
                return (
                  <>
                    {" "}
                    <h1 className="">{withPortfolio.title}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: withPortfolio.description ?? "",
                      }}
                    ></p>
                  </>
                );
              })}
            </div>
          </>

          <ButtonTab />
          {portfolio
            .filter((e) => e.tags?.includes(filter))
            .map((item) => (
              <div
                key={item.id}
                onClick={() => console.log(item)}
                className="col-lg-3"
              >
                <div className="img">
                  <Link href={`/${item.id}`}>
                    <a>
                      {" "}
                      <FaEye className="eye" />
                      <UrlImage
                        className="texttt"
                        src={item.image.banner}
                        width={368}
                        height={250}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </Row>
      </Container>
    </div>
  );
}
const mapDispatch = (dispatch) => {
  const { setLocale } = dispatch.language;

  return {
    setLanguage: setLocale,
  };
};

const mapState = ({ language }) => ({
  language,
});

export default connect(mapState, mapDispatch)(Portfolio);
