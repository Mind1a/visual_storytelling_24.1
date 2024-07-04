import { adpositions, verbs, signs } from "../data/index.js";

export const refKeys = [
  "noun1",
  "sign1",
  "noun2",
  "sign2",
  "noun3",
  "sign3",
  "verb",
];

const createSentence = (keys, omitIndices) => {
  return keys
    .filter((_, index) => !omitIndices.includes(index))
    .reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {});
};

export const threeWordSentence = createSentence(refKeys, [4, 5]);
export const fourWordSentence = createSentence(refKeys, []);

export const getSteps = (step, count) => {
  return step < count - 1 ? refKeys[step] : "verb";
};

export const get5Steps = step => getSteps(step, 5);
export const get7Steps = step => getSteps(step, 7);

export const getWords = (step, words, stepsLength, setActive) => {
  const noun = words.flatMap(word => word.nouns);
  const sign = words.flatMap(word => word.signs);
  const verb = words.flatMap(word => word.verbs);
  const adpositions = words.flatMap(word => word.adpositions);

  switch (step) {
    case stepsLength:
      setActive({ verb: true });
      return verb;
    case stepsLength - 1:
      setActive({ verb: true });
      return verb;
    case 0:
    case 2:
    case 4:
      setActive({ noun: true });
      return noun;
    case 1:
    case 5:
      setActive({ sign: true });
      return sign;
    case 3:
      stepsLength === 5
        ? setActive({ sign: true })
        : setActive({ adposition: true });
      return stepsLength === 5 ? sign : adpositions;
    default:
      return verb;
  }
};

// for generating random words
export const generateWords = (array, predefinedWords = []) => {
  function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  // Extract words from predefinedWords
  const predefinedWordSet = new Set(
    predefinedWords.map(word => (typeof word === "string" ? word : word.word)),
  );

  // Find and store original objects from predefinedWords
  const predefinedWordObjects = array.filter(item =>
    predefinedWordSet.has(item.word),
  );

  // Filter out predefined words from the array to avoid duplication
  const filteredArray = array.filter(item => !predefinedWordSet.has(item.word));

  // Shuffle the filtered array to randomize word selection
  const shuffledFilteredArray = shuffleArray(filteredArray);

  // Calculate how many random words are needed to fill up to 7 words
  const numberOfRandomWordsNeeded = 7 - predefinedWordObjects.length;

  // Select random words from the filtered and shuffled array
  const randomWords = shuffledFilteredArray.slice(0, numberOfRandomWordsNeeded);

  // Combine predefined words with selected random words
  const combinedWords = [...predefinedWordObjects, ...randomWords];

  // Shuffle the combined array to mix predefined and random words
  const finalWords = shuffleArray(combinedWords);

  return finalWords.slice(0, 7);
};

// for generating sentence data
export const createSentenceData = (
  category,
  nounsArgs,
  verbsArgs,
  adpositionsArgs,
) => {
  return {
    nouns: generateWords(category, nounsArgs),
    verbs: generateWords(verbs, verbsArgs),
    signs: signs,
    adpositions: generateWords(adpositions, adpositionsArgs),
  };
};

// for animation
export const animationConfig = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1 },
};
