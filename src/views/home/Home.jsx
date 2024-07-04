import { useState } from "react";
import { motion } from "framer-motion";
import useScreenshot from "../../hooks/useScreenshot";
import { animationConfig } from "../../utils";

import { categories } from "../../data/categories";
import { SentenceButton } from "../../components/buttons/sentenceButton";
import { CategoryCard } from "../../components/cards/categoryCard";
import { BasicButton } from "../../components/buttons/basicButton";
import { CreateSentence } from "../../components/createSentence";

import styles from "./Home.module.scss";

const Home = () => {
  const [words, setWords] = useState(null);
  const [category, setCategory] = useState(null);
  const [start, setStart] = useState(false);
  const [sentence, setSentence] = useState(0);
  const [ref, takeScreenshot] = useScreenshot();

  const handleStart = () => {
    if (words && category) {
      setStart(true);
    }
  };

  const handleNextSentence = () => {
    if (sentence < 6) {
      setSentence(prevStep => prevStep + 1);
    } else {
      setStart(false);
      setSentence(0);
      setCategory(null);
      setWords(null);
    }
  };

  return (
    <motion.div
      {...animationConfig}
      className={styles.container}
      ref={ref}>
      {!start ? (
        <>
          <div className={styles.buttonWrapper}>
            <SentenceButton
              onClick={() => setWords(3)}
              selected={words === 3}
              wordCount={3}
            />
            <SentenceButton
              onClick={() => setWords(4)}
              selected={words === 4}
              wordCount={4}
            />
          </div>

          <div className={styles.categoryWrapper}>
            {categories.map(item => (
              <CategoryCard
                key={item.id}
                item={item}
                onClick={() => setCategory(item)}
                selected={category?.id === item.id}
              />
            ))}
          </div>

          <BasicButton
            disabled={!words || !category}
            onClick={handleStart}>
            დაწყება
          </BasicButton>
        </>
      ) : (
        <CreateSentence
          words={words}
          data={category.data[sentence]}
          sentence={sentence}
          handleNextSentence={handleNextSentence}
          takeScreenshot={takeScreenshot}
        />
      )}
    </motion.div>
  );
};

export default Home;
