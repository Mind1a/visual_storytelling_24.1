import { useState } from "react";

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

  const handleStart = () => {
    if (words && category) {
      setStart(true);
    }
  };

  return (
    <div className={styles.container}>
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
                onClick={() => setCategory(item.name)}
                selected={category === item.name}
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
          category={category}
        />
      )}
    </div>
  );
};

export default Home;
