import React, { useEffect, useState } from "react";
import Image from "next/image";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Link } from "react-scroll";
import UrlImage from "../UrlImage";
import { connect } from "react-redux";
const Header = ({ language, setLanguage }) => {
  const [header, setHeader] = useState([]);
  const [languageOption, setLanguageOption] = useState([]);

  const getData = () => {
    const projectRef = collection(db, "header_item");
    if (!projectRef.empty) {
      onSnapshot(
        projectRef,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `header_item/${doc.id}/header_item_locales`
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
            const results = docs.map((header) => {
              const localesOfHeader = locales.find((locale) => {
                return !!locale[header.id];
              });

              return {
                ...header,
                locales: {
                  vi: Object.values(localesOfHeader).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: header,
                },
              };
            });

            setHeader(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  console.log("header", header);
  useEffect(() => {
    getData();
  }, []);
  const handleLan = (item) => {
    console.log("this", item);
  };
  useEffect(() => {
    const projectRef = collection(db, "languageSection");
    if (!projectRef.empty) {
      onSnapshot(
        projectRef,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setLanguageOption([...docs]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);
  console.log(languageOption, "language");
  const [stickyClass, setStickyClass] = useState("relative");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      windowHeight > 200
        ? setStickyClass("fixedd top-0 left-0 z-50 w-100   ")
        : setStickyClass("relative");
    }
  };

  return (
    <div>
      <div className={`h-16 w-full bg-gray-200 ${stickyClass} header`}>
        {/* <Image src={"/image/bg.jpg"} width={1000} height={1000} /> */}
        <div className="menu">
          <a href="#">
            <Image
              className="logo"
              src={"/image/logoWhite.svg"}
              width={232}
              height={70}
            />
          </a>
          <ul>
            {/* <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Pages</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <p>
                Need help? <a href="#">096-4400-370</a>
              </p>
            </li> */}

            {header.map((item) => {
              const headerWitchLocaces = item.locales[language];
              return (
                <>
                  <li key={item.id}>
                    <Link
                      activeClass="active fixedactive"
                      spy
                      to={item.key}
                      offset={-200}
                    >
                      {headerWitchLocaces.name}
                    </Link>
                  </li>
                </>
              );
            })}
            {/* <li>
              {" "}
              <div className="language">{language.map((item)=> (

              ))}</div>
            </li> */}
            {languageOption.map((item) => {
              return (
                <>
                  <div
                    className="language"
                    onClick={() => [
                      language !== item.key ? setLanguage(item.key) : null,
                      handleLan(item),
                    ]}
                  >
                    <UrlImage
                      src={item.icon}
                      key={item.key}
                      width={35}
                      height={30}
                    />
                  </div>
                  {/* <UrlImage
                    onClick={() => [
                      language !== item.key ? setLanguage(item.key) : null,
                      handleLan(item),
                    ]}
                    src={item.icon}
                    key={item.key}
                    width={35}
                    height={30}
                  /> */}
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
const mapDispatch = (dispatch) => {
  const { setLocale } = dispatch.language;

  return {
    setLanguage: setLocale,
  };
};

const mapState = ({ language }) => ({
  language,
});

export default connect(mapState, mapDispatch)(Header);
