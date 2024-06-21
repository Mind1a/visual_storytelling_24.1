import React, { useContext } from "react";
import styles from "./Paginate.module.scss";
import rightArrowIcon from "../../../assets/images/right-arrow-icon.png";
import leftArrowIcon from "../../../assets/images/left-arrow-icon.png";
import { GalleryContext } from "../../../context/features/galleryContext";

const Paginate = () => {
  const { pages, pageCount, handlePageClick } = useContext(GalleryContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.prev}>
          <img
            src={leftArrowIcon}
            alt="sd"
          />
        </div>
        <div className={styles.pages}>
          <div
            className={styles.firstPage}
            onClick={() => handlePageClick(0)}>
            <span>1</span>
          </div>
          {pages[1] > 3 ? (
            <div className={styles.ellipsis}>
              <span>...</span>
            </div>
          ) : null}
          <div className={styles.pagesToNavigate}>
            {pages.map(page => (
              <div
                key={page}
                className={styles.page}
                onClick={() => handlePageClick(page)}>
                {page}
              </div>
            ))}
          </div>
          {pages[1] !== pageCount - 1 ? (
            <div className={styles.ellipsis}>
              <span>...</span>
            </div>
          ) : null}
          <div
            className={styles.lastPage}
            onClick={() => handlePageClick(pageCount)}>
            <span>{pageCount}</span>
          </div>
        </div>
        <div className={styles.next}>
          <img
            src={rightArrowIcon}
            alt="sd"
          />
        </div>
      </div>
    </div>
  );
};

export default Paginate;
