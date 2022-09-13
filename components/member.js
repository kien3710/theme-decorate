import { Container } from "@mui/system";
import React, { useState, useEffect } from "react";
import { dataMember } from "../data/datamember";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import UrlImage from "../UrlImage";
import { connect } from "react-redux";
function Member({ language, setLanguage }) {
  const [member, setMember] = useState([]);
  const [teamTile, setTeamTitle] = useState([]);
  useEffect(() => {
    const getDataMember = collection(db, "team_members");

    if (!getDataMember.empty) {
      onSnapshot(
        getDataMember,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `team_members/${doc.id}/team_members_locales`
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
            const results = docs.map((member) => {
              const localesOfMember = locales.find((locale) => {
                return !!locale[member.id];
              });

              return {
                ...member,
                locales: {
                  vi: Object.values(localesOfMember).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: member,
                },
              };
            });

            setMember(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  //title
  useEffect(() => {
    const getDataMember = collection(db, "team_section");

    if (!getDataMember.empty) {
      onSnapshot(
        getDataMember,
        (snapshot) => {
          let docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const promisesDocs = docs.map((doc) => {
            return new Promise((resolve) => {
              const localeCollections = collection(
                db,
                `team_section/${doc.id}/team_locales`
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
            const results = docs.map((member) => {
              const localesOfMember = locales.find((locale) => {
                return !!locale[member.id];
              });

              return {
                ...member,
                locales: {
                  vi: Object.values(localesOfMember).reduce((p, c) => ({
                    ...p,
                    ...c,
                  })),
                  en: member,
                },
              };
            });

            setTeamTitle(results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  return (
    <div>
      <div className="member" id="team">
        <Container>
          {teamTile.map((item) => {
            const withhTitleMember = item.locales[language];
            return (
              <>
                <div className="team__title">
                  {" "}
                  <h1>{withhTitleMember.title}</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: withhTitleMember.description ?? "",
                    }}
                  ></p>
                </div>
              </>
            );
          })}
          <ul>
            {member.map((item) => {
              const withMember = item.locales[language];
              return (
                <>
                  {" "}
                  <li>
                    <UrlImage src={withMember.image} />
                    <div className="text">
                      <h2>{withMember.name}</h2>
                      <p>{withMember.position}</p>
                    </div>
                  </li>
                </>
              );
            })}
            {/* {member.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <li key={item.id}>
                <UrlImage src={item.image} alt="#" />
                <div className="text">
                  <h2>{item.name}</h2>
                  <p>{item.position}</p>
                </div>
              </li>
            ))} */}
          </ul>
        </Container>
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
export default connect(mapState, mapDispatch)(Member);
