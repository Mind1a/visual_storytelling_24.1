import styles from "./Gallery.module.scss";
import { Card } from "../../components/gallery/card";
import { Paginate } from "../../components/gallery/pagination";
import { useContext } from "react";
import { GalleryContext } from "../../context/features/galleryContext";
import { Filters } from "../../components/gallery/filters";
import { useSearchParams } from "react-router-dom";

const Gallery = () => {
  const { currentItems } = useContext(GalleryContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const addQueryParams = (key, value) => {
    let newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const removeQueryParam = key => {
    let newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams.toString());
  };

  return (
    <div className={styles.container}>
      <div className={styles.galleryWrapper}>
        <div className={styles.filter}>
          <Filters removeQueryParam={removeQueryParam} />
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
      <Paginate addQueryParams={addQueryParams} />
    </div>
  );
};

export default Gallery;
