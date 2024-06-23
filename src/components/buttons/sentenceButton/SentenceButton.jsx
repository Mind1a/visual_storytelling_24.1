import { LightBulbs } from "../../svgs";
import styles from "./SentenceButton.module.scss";

export const SentenceButton = ({ wordCount, onClick, selected }) => {
  const wordClass =
    wordCount === 3 ? styles.words3 : wordCount === 4 ? styles.words4 : "";

  return (
    <div className={styles.container}>
      <LightBulbs isActive={selected} />
      <button
        className={`${styles.sentenceButton}  ${wordClass} ${selected && styles.active}`}
        onClick={onClick}>
        <span>{wordCount}</span> სიტყვიანი <br /> წინადადება
      </button>
    </div>
  );
};
