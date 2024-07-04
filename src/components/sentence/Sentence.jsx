import { motion } from "framer-motion";
import styles from "./Sentence.module.scss";

export const Sentence = ({ selectedWords }) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const animationProps = {
    initial: "hidden",
    animate: "visible",
    variants: variants,
  };

  return (
    <p className={styles.sentence}>
      {selectedWords.noun1?.word && (
        <motion.span {...animationProps}>
          {selectedWords.noun1.word}
        </motion.span>
      )}
      {selectedWords.sign1?.word && (
        <motion.span {...animationProps}>
          {selectedWords.sign1.word}{" "}
        </motion.span>
      )}
      {selectedWords.noun2?.word && (
        <motion.span {...animationProps}>
          {selectedWords.noun2.word}
        </motion.span>
      )}
      {selectedWords.sign2?.word && (
        <motion.span {...animationProps}>
          {selectedWords.sign2.word}{" "}
        </motion.span>
      )}
      {selectedWords.noun3?.word && (
        <motion.span {...animationProps}>
          {selectedWords.noun3.word}
        </motion.span>
      )}
      {selectedWords.sign3?.word && (
        <motion.span {...animationProps}>
          {selectedWords.sign3.word}{" "}
        </motion.span>
      )}
      {selectedWords.verb?.word && (
        <motion.span {...animationProps}>{selectedWords.verb.word}</motion.span>
      )}
    </p>
  );
};
