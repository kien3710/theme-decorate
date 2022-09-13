import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import ServicesItem from "./servicesItem";
import { connect } from "react-redux";

function Services({ language, setLanguage }) {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const services = collection(db, "services_section");

    if (!services.empty) {
      onSnapshot(
        services,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `services_section/${doc.id}/services_locales`
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
            const results = docs.map((services) => {
              const localesOfServices = locales.find((locale) => {
                return !!locale[services.id];
              });

              return {
                ...services,
                locales: {
                  vi: Object.values(localesOfServices).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: services,
                },
              };
            });

            setServices(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return (
    <div className="services" id="services">
      <Container>
        {/* <p>
          We bring to customer CREATIVITY and TECHNOLOGY together to innovate
          and thrive. Collaborating with clients to build innovative products
          and immersive experiences.We bring perfect UI/UX web and mobile
          application to you with standard Material Design. work with our
          creative design team Behance Profile
        </p> */}
        <div className="our-services">
          {services.map((item) => {
            const withServicesLocle = item.locales[language];
            return (
              <>
                {" "}
                <h2> {withServicesLocle.title}</h2>
                <ul>
                  {" "}
                  <ServicesItem items={withServicesLocle.listServiceItem} />
                </ul>
              </>
            );
          })}
        </div>
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
export default connect(mapState, mapDispatch)(Services);
