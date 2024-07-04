import { motion } from "framer-motion";
import { Card } from "../cards/Card";
import styles from "./WordCards.module.scss";

export const WordCards = ({
  step,
  words,
  active,
  currentWords,
  fadedWords,
  handleDragEnd,
  handleDragStart,
}) => {
  const dragProps = item =>
    (words === 3 ? step < 5 : step < 7) &&
    !fadedWords.includes(item) && {
      drag: true,
      dragConstraints: { top: 0, bottom: 0, left: 0, right: 0 },
      dragElastic: 1,
      onDragStart: () => handleDragStart(item),
      onDragEnd: (event, info) => handleDragEnd(event, info, item),
      whileHover: {
        scale: 1.1,
        cursor: " grab",
        transition: { duration: 0.3 },
      },
      whileDrag: {
        scale: 1.2,
        boxShadow: "0 0 10px #00000079",
        border: "2px solid #0AA91A",
        cursor: "grabbing",
        zIndex: 1000,
        transition: { duration: 0.3 },
      },
    };

  function determineWrapperStyles(active) {
    if (active.noun) {
      return styles.nounsWrapper;
    } else if (active.verb) {
      return styles.verbsWrapper;
    } else if (active.sign) {
      return styles.signsWrapper;
    } else if (active.adposition) {
      return styles.adpositionsWrapper;
    }
    return "";
  }

  const wrapperStyles = determineWrapperStyles(active);

  return (
    <div className={`${styles.wrapper} ${wrapperStyles}`}>
      <div className={styles.fadedWrapper}>
        {currentWords.map(item => (
          <div
            className={styles.fadedCard}
            key={item.id}>
            <Card item={item} />
          </div>
        ))}
      </div>

      {currentWords.map(item => (
        <motion.div
          className={`${styles.card} ${fadedWords.includes(item) ? styles.faded : ""} ${item.type === "verb" ? styles.verb : ""}`}
          {...dragProps(item)}
          key={item.id}
          data-tooltip={item.word}>
          <Card item={item} />
        </motion.div>
      ))}
    </div>
  );
};
