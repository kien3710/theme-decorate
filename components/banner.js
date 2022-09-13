import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import CountUp from "react-countup";
import { collection, onSnapshot, query, limit } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import UrlImage from "../UrlImage";
import { connect } from "react-redux";
function Banner({ language, setLanguage }) {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    const callBanner = query(collection(db, "counter_section"), limit(4));
    if (!callBanner.empty) {
      onSnapshot(
        callBanner,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `counter_section/${doc.id}/counter_section_locales`
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
            const results = docs.map((banner) => {
              const localesOfBanner = locales.find((locale) => {
                return !!locale[banner.id];
              });

              return {
                ...banner,
                locales: {
                  vi: Object.values(localesOfBanner).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: banner,
                },
              };
            });

            setBanner(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);
  console.log("bbanner", banner);
  return (
    <div>
      <div id="projects" className="maxbanner">
        <div className="banner">
          <div className="banner-ig"></div>
          <Container>
            <div className="banner-text">
              <ul>
                {banner.map((item) => {
                  const withBannerLocle = item.locales[language];
                  return (
                    <li key={item.id}>
                      <h2>
                        <CountUp start={0} end={item.number} />
                      </h2>
                      <h4>{withBannerLocle.title}</h4>
                      <UrlImage src={item.image} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Container>
        </div>
      </div>
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
export default connect(mapState, mapDispatch)(Banner);
