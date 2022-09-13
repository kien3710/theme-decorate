import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function UrlImage(props) {
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();
  const [loading, setLoading] = useState(false);

  const getImage = () => {
    if (props.src) {
      setLoading(true);
      getDownloadURL(ref(storage, props.src))
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error(error);
          return false;
        })
        .finally(() => setLoading(false));
    } else {
      return null;
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      {!loading ? (
        <img
          src={imageUrl}
          width={props.width}
          height={props.height}
          className={props.className}
          alt={props.alt}
        />
      ) : (
        "loading"
      )}
    </>
  );
}
