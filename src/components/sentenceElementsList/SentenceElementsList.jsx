import styles from "./SentenceElementsList.module.scss";

export const SentenceElementsList = ({ active, words }) => {
  return (
    <ul className={styles.list}>
      <li
        className={`${styles.listItem} ${styles.nouns} ${active.noun ? styles.active : ""}`}>
        არსებითი სახელი
      </li>
      <li
        className={`${styles.listItem} ${styles.signs} ${active.sign ? styles.active : ""}`}>
        ბრუნვის ნიშნები
      </li>
      <li
        className={`${styles.listItem} ${styles.adpositions} ${active.adposition ? styles.active : ""} ${words === 3 ? styles.faded : ""}`}>
        თანდებულები
      </li>
      <li
        className={`${styles.listItem} ${styles.verbs} ${active.verb ? styles.active : ""}`}>
        ზმნები
      </li>
    </ul>
  );
};
