import styles from "./Card.module.scss";
import dlIcon from "../../../assets/images/dl-icon.png";

const Card = ({ item }) => {
  return (
    <div className={styles.card}>
      <div className={item.type === "verb" ? styles.verbBox : styles.box}>
        <img
          src={item.image}
          alt={item.word}
          className={styles.image}
        />
        <img
          src={dlIcon}
          alt="download icon"
          className={styles.dlIcon}
        />
      </div>
      <p className={styles.word}>{item.word}</p>
    </div>
  );
};

export default Card;
