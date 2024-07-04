import styles from "./BasicButton.module.scss";

export const BasicButton = ({ children, onClick, disabled, secondary }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${secondary ? styles.secondary : styles.primary}`}>
      {children}
    </button>
  );
};
