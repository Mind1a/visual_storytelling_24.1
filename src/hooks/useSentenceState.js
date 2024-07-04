import { useState, useEffect, useCallback } from "react";
import { getWords } from "../utils";
import useWordDrag from "./useWordDrag";

export const useSentenceState = (data, words, getSteps) => {
  const [step, setStep] = useState(0);
  const [selectedWords, setSelectedWords] = useState(words);
  const [highlightedBox, setHighlightedBox] = useState(null);
  const [currentWords, setCurrentWords] = useState([]);
  const [fadedWords, setFadedWords] = useState([]);
  const [active, setActive] = useState({
    noun: false,
    sign: false,
    adposition: false,
    verb: false,
  });

  const getCurrentWords = useCallback(() => {
    const selectedWordsLength = Object.keys(selectedWords).length;
    return getWords(step, data, selectedWordsLength, setActive);
  }, [step, data, selectedWords]);

  useEffect(() => {
    const newCurrentWords = getCurrentWords();
    setCurrentWords(newCurrentWords);

    const newFadedWords = newCurrentWords.filter(item =>
      Object.values(selectedWords).some(
        selectedItem => selectedItem && selectedItem.id === item.id,
      ),
    );
    setFadedWords(newFadedWords);
  }, [selectedWords, step, getCurrentWords]);

  const handleSelect = (item, boxType) => {
    setSelectedWords(prevSelectedWords => ({
      ...prevSelectedWords,
      [boxType]: item,
    }));
    setStep(prevStep => prevStep + 1);
  };

  const { refs, handleDragStart, handleDragEnd } = useWordDrag({
    step,
    handleSelect,
    setHighlightedBox,
    getSteps,
  });

  const clearSelectedWords = () => {
    setSelectedWords(words);
    setStep(0);
    setHighlightedBox(null);
    setFadedWords([]);
  };
  const goBack = () => {
    if (step === 0) {
      clearSelectedWords();
      return;
    }

    setStep(prevStep => prevStep - 1);
    setHighlightedBox(null);

    setSelectedWords(prevSelectedWords => {
      const newSelectedWords = { ...prevSelectedWords };

      const keys = Object.keys(newSelectedWords);
      const lastKey = keys[step - 1];

      newSelectedWords[lastKey] = null;

      return newSelectedWords;
    });

    setFadedWords(() => {
      const newFadedWords = currentWords.filter(item =>
        Object.values(selectedWords).some(
          selectedItem => selectedItem && selectedItem.id === item.id,
        ),
      );
      return newFadedWords;
    });
  };

  return {
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
  };
};
