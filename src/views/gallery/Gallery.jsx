import { motion } from "framer-motion";
import styles from "./Gallery.module.scss";
import { Card } from "../../components/gallery/card";
import { Paginate } from "../../components/gallery/pagination";
import { useContext } from "react";
import { GalleryContext } from "../../context/features/galleryContext";
import { Filters } from "../../components/gallery/filters";
import { useSearchParams } from "react-router-dom";
import { animationConfig } from "../../utils";

const Gallery = () => {
  const { currentItems, isSearching } = useContext(GalleryContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const addQueryParams = (key, value) => {
    let newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <motion.div
      {...animationConfig}
      className={styles.container}>
      <div className={styles.galleryWrapper}>
        <div className={styles.filter}>
          <Filters addQueryParams={addQueryParams} />
        </div>
        <div className={styles.gallery}>
          <div className={styles.errorMsg}>
            {isSearching && currentItems.length === 0 ? (
              <p>არაფერი მოიძებნა!</p>
            ) : null}
          </div>
          {currentItems.map(item => (
            <Card
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
      {!isSearching ? <Paginate addQueryParams={addQueryParams} /> : null}
    </motion.div>
  );
};

export default Gallery;
