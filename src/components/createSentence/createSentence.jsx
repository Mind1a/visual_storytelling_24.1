export const CreateSentence = ({ words, category }) => {
  return (
    <div>
      <p>{words} სიტყვიანი წინადადება</p>
      <p>კატეგორია: {category}</p>
    </div>
  );
};
