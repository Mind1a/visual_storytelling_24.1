import React, { useContext, useEffect } from "react";
import styles from "./Paginate.module.scss";
import rightArrowIcon from "../../../assets/images/right-arrow-icon.png";
import leftArrowIcon from "../../../assets/images/left-arrow-icon.png";
import { GalleryContext } from "../../../context/features/galleryContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Paginate = ({ addQueryParams }) => {
  const {
    pages,
    setQPage,
    pageCount,
    handlePageClick,
    handleRightArrowClick,
    handleLeftArrowClick,
    currentPage,
    resetGallery,
  } = useContext(GalleryContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qPage = searchParams.get("page");

  useEffect(() => {
    if (qPage) {
      setQPage(+qPage);
    }
  }, []);

  useEffect(() => {
    if (!qPage) {
      resetGallery();
    }
  }, []);

  const handlePageUrl = page => {
    if (page) {
      addQueryParams("page", page);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          className={styles.prev}
          onClick={() => {
            handleLeftArrowClick(currentPage - 1);
            if (currentPage - 1 === 1) {
              navigate("/gallery");
            } else {
              handlePageUrl(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}>
          <img
            src={leftArrowIcon}
            alt="sd"
          />
        </button>
        <div className={styles.pages}>
          <div
            className={currentPage === 1 ? styles.active : styles.firstPage}
            onClick={() => {
              handlePageClick(1);
              handlePageUrl(1);
              navigate("/gallery");
            }}>
            <span>1</span>
          </div>
          {pages[0] >= 3 ? (
            <div className={styles.ellipsis}>
              <span>...</span>
            </div>
          ) : null}
          <div className={styles.pagesToNavigate}>
            {pages.map(page => (
              <div
                key={page}
                className={
                  currentPage === page || qPage === page
                    ? styles.active
                    : styles.page
                }
                onClick={() => {
                  handlePageClick(page);
                  handlePageUrl(page);
                }}>
                {page}
              </div>
            ))}
          </div>
          {pages[2] !== pageCount - 1 ? (
            <div className={styles.ellipsis}>
              <span>...</span>
            </div>
          ) : null}
          <div
            className={
              currentPage === pageCount ? styles.active : styles.lastPage
            }
            onClick={() => {
              handlePageClick(pageCount);
              handlePageUrl(pageCount);
            }}>
            <span>{pageCount}</span>
          </div>
        </div>
        <button
          className={styles.next}
          onClick={() => {
            handleRightArrowClick(currentPage + 1);
            handlePageUrl(currentPage + 1);
          }}
          disabled={currentPage === pageCount}>
          <img
            src={rightArrowIcon}
            alt="sd"
          />
        </button>
      </div>
    </div>
  );
};

export default Paginate;
