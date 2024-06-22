import styles from "./Gallery.module.scss";
import { Card } from "../../components/gallery/card";
import { Paginate } from "../../components/gallery/pagination";
import { useContext } from "react";
import { GalleryContext } from "../../context/features/galleryContext";

const Gallery = () => {
  const { currentItems } = useContext(GalleryContext);

  return (
    <div className={styles.container}>
      <div className={styles.galleryWrapper}>
        <div className={styles.filter}>
          {" "}
          <h1>here goes filters</h1>
        </div>
        <div className={styles.gallery}>
          {currentItems.map(item => (
            <Card
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
      <Paginate />
    </div>
  );
};

export default Gallery;
