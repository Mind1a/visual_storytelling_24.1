import { useState } from "react";
import styles from "./Card.module.scss";

export const Card = ({ item }) => {
  const [loaded, setLoaded] = useState(false);

  return item.image ? (
    <img
      className={`${styles.image} ${loaded ? styles.loaded : ""}`}
      src={item.image}
      alt={item.label || item.word}
      draggable="false"
      onLoad={() => setLoaded(true)}
    />
  ) : (
    <p>{item.label || item.word}</p>
  );
};
