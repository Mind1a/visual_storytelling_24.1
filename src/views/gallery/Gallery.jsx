import styles from "./Gallery.module.scss";
import { Card } from "../../components/gallery";
import { galleryData } from "../../data";

const Gallery = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        {" "}
        <h1>here goes filters</h1>
      </div>
      <div className={styles.gallery}>
        {galleryData.slice(0, 8).map(item => (
          <Card
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
