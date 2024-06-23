import styles from "./BasicButton.module.scss";

export const BasicButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.basicButton}>
      {children}
    </button>
  );
};
