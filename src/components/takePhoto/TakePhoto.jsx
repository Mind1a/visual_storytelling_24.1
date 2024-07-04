import styles from "./TakePhoto.module.scss";

export const TakePhoto = ({ takeScreenshot }) => {
  return (
    <div
      className={styles.container}
      onClick={takeScreenshot}>
      <img
        src="/images/svgs/take-photo.svg"
        alt="take photo"
      />
      <p>ფოტოს გადაღება</p>
    </div>
  );
};
