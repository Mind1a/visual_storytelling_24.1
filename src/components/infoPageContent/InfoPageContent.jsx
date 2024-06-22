import styles from "./InfoPageContent.module.scss";
import PatternNotebook from "./../../assets/patterns/patternNotebook.svg";
import PatternPancil from "./../../assets/patterns/patternPencil.svg";
import PatternIntersect from "./../../assets/patterns/patternIntersect.svg";
import PatternPolygon from "./../../assets/patterns/patternPolygon.svg";

const InfoPageContent = ({ heading, text }) => {
  return (
    <div className={styles.contentWrapper}>
      <img
        src={PatternNotebook}
        alt="background pattern-notebook"
        className={`${styles.bgPattern} ${styles.topLeft}`}
      />
      <img
        src={PatternPancil}
        alt="background pattern-pencil"
        className={`${styles.bgPattern} ${styles.topRight}`}
      />
      <img
        src={PatternIntersect}
        alt="background pattern-intersect"
        className={`${styles.bgPattern} ${styles.bottomLeft}`}
      />
      <img
        src={PatternPolygon}
        alt="background pattern-polygon"
        className={`${styles.bgPattern} ${styles.bottomRight}`}
      />

      <h1>{heading}</h1>
      <p>{text}</p>
    </div>
  );
};

export default InfoPageContent;
