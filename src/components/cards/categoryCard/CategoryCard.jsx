import styles from "./CategoryCard.module.scss";

export const CategoryCard = ({ item, onClick, selected }) => {
  return (
    <div
      className={styles.container}
      onClick={onClick}>
      <img
        className={`${styles.card} ${selected && styles.active}`}
        src={item.img}
        alt={item.name}
      />
      <p className={styles.title}>{item.title}</p>
    </div>
  );
};
