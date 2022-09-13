import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import FeaturesItem from "./featuresItem";
import { connect } from "react-redux";
function Features({ language, setLanguage }) {
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    const features = collection(db, "features_section");

    if (!features.empty) {
      onSnapshot(
        features,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `features_section/${doc.id}/features_locales`
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
            const results = docs.map((features) => {
              const localesOfFeatures = locales.find((locale) => {
                return !!locale[features.id];
              });

              return {
                ...features,
                locales: {
                  vi: Object.values(localesOfFeatures).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: features,
                },
              };
            });

            setFeatures(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);
  console.log("tech", features);
  return (
    <>
      <div className="tech-text" id="features">
        <div className="row">
          {features.map((item) => {
            const withFeaturesLocle = item.locales[language];
            return (
              <>
                <h1>{withFeaturesLocle.title}</h1>
                <p className="cc">{withFeaturesLocle.description}</p>

                <FeaturesItem items={withFeaturesLocle.listFeaturestem} />
              </>
            );
          })}
        </div>
      </div>
    </>
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
export default connect(mapState, mapDispatch)(Features);
