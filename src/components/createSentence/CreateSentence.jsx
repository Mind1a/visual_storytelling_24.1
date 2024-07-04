import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSentenceState } from "../../hooks/useSentenceState";
import {
  animationConfig,
  fourWordSentence,
  get5Steps,
  get7Steps,
  threeWordSentence,
} from "../../utils";

import { SentenceElementsList } from "../sentenceElementsList";
import { WordCards } from "../wordCards";
import { DropBoxes } from "../dropBoxes";
import { Sentence } from "../sentence";
import { BasicButton } from "../buttons/basicButton/BasicButton";
import { TakePhoto } from "../takePhoto";
import { Loader } from "../loader";

import styles from "./CreateSentence.module.scss";

export const CreateSentence = ({
  words,
  data,
  sentence,
  handleNextSentence,
  takeScreenshot,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    step,
    active,
    selectedWords,
    fadedWords,
    highlightedBox,
    currentWords,
    refs,
    handleDragStart,
    handleDragEnd,
    clearSelectedWords,
    goBack,
  } = useSentenceState(
    data,
    words === 3 ? threeWordSentence : fourWordSentence,
    words === 3 ? get5Steps : get7Steps,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const hanleReset = () => {
    clearSelectedWords();
  };

  const handleGoBack = () => {
    goBack();
  };

  return (
    <motion.div
      {...animationConfig}
      className={styles.container}>
      <motion.div
        {...animationConfig}
        className={styles.wrapper}>
        <SentenceElementsList
          active={active}
          words={words}
        />

        <WordCards
          step={step}
          words={words}
          active={active}
          currentWords={currentWords}
          fadedWords={fadedWords}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </motion.div>

      <DropBoxes
        words={words}
        selectedWords={selectedWords}
        refs={refs}
        highlighted={highlightedBox}
      />

      <div className={styles.buttonsWrapper}>
        <span>წინადადება {sentence + 1}</span>
        <Sentence selectedWords={selectedWords} />

        <button
          className={styles.resetButton}
          disabled={!selectedWords.noun1}
          onClick={hanleReset}
          data-tooltip="გასუფთავება">
          <img
            src="/images/svgs/reset.svg"
            alt="reset"
          />
        </button>

        <button
          className={styles.backButton}
          disabled={!selectedWords.noun1}
          onClick={handleGoBack}
          data-tooltip="უკან დაბრუნება">
          <img
            className={styles.backArrow}
            src="/images/svgs/arrow.svg"
            alt="back arrow"
          />
        </button>

        <BasicButton
          secondary
          disabled={!selectedWords.verb}
          onClick={() => {
            handleNextSentence();
            hanleReset();
          }}>
          შემდეგი
          <img
            className={styles.arrow}
            src="/images/svgs/arrow.svg"
            alt="arrow"
          />
        </BasicButton>

        <TakePhoto takeScreenshot={takeScreenshot} />
      </div>
    </motion.div>
  );
};
