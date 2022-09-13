import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { datahome } from "../data/datahome";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import { connect } from "react-redux";
import { useState, useEffect } from "react";
const Sliderbg = ({ language, setLanguage }) => {
  const [sliderbg, setSliderbg] = useState([]);
  useEffect(() => {
    const sliderbg = collection(db, "header_section");

    if (!sliderbg.empty) {
      onSnapshot(
        sliderbg,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `header_section/${doc.id}/header_locales`
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
            const results = docs.map((slidebg) => {
              const localesOfSlidebg = locales.find((locale) => {
                return !!locale[slidebg.id];
              });

              return {
                ...features,
                locales: {
                  vi: Object.values(localesOfSlidebg).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: slidebg,
                },
              };
            });

            setSliderbg(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);
  console.log("slider", sliderbg);
  return (
    <>
      <div>
        {datahome.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <div className="slidebg">
            <div className="overlay">s</div>
            <div className="text">
              {/* <h1 className="text-header">
                THINKTODO <br />
              </h1>
              <h1 className="text-header-2">
                {" "}
                We are proud of bringing the magic to life!
              </h1> */}
            </div>
            <button>DOWNLOAD</button>
            <img src={item.imghome} alt="" />
          </div>
        ))}
      </div>
      {sliderbg.map((item) => {
        const withSlider = item.locales[language];
        return (
          <>
            <div className="text__header">
              <h1>{withSlider.title}</h1>
              <h1>{withSlider.description}</h1>
            </div>
          </>
        );
      })}
    </>
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

export default connect(mapState, mapDispatch)(Sliderbg);
