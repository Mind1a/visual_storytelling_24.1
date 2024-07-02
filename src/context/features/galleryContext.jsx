import { createContext, useEffect, useState } from "react";
import { galleryData } from "../../data";

export const GalleryContext = createContext();

const itemsPerPage = 8;
const defaultPages = [2, 3, 4];

const GalleryProvider = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState(galleryData);

  const [itemOffset, setItemOffset] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [qPage, setQPage] = useState(null);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const resetGallery = () => {
    setItemOffset(0);
    setPages(defaultPages);
    setCurrentPage(1);
    setQPage(null);
  };

  useEffect(() => {
    if (qPage !== null && qPage !== undefined) {
      if (qPage === pageCount) {
        setPages([qPage - 3, qPage - 2, qPage - 1]);
      } else if (qPage === pageCount - 1) {
        setPages([qPage - 2, qPage - 1, qPage]);
      } else if (qPage === 1) {
        setPages([qPage + 1, qPage + 2, qPage + 3]);
      } else if (qPage === 2) {
        setPages([qPage, qPage + 1, qPage + 2]);
      } else {
        setPages([qPage - 1, qPage, qPage + 1]);
      }

      setCurrentPage(qPage);
      setItemOffset(((qPage - 1) * itemsPerPage) % data.length);
    } else {
      const currPages = [...Array(pageCount + 1).keys()].slice(2, 5);
      setPages(currPages);
    }
  }, [qPage]);

  const handlePageClick = page => {
    setCurrentPage(page);

    const newOffset = ((page - 1) * itemsPerPage) % data.length;
    setItemOffset(newOffset);

    if (page === 1) {
      setPages(defaultPages);
    }

    if (page === pageCount) {
      setPages([pageCount - 3, pageCount - 2, pageCount - 1]);
    }

    if (page <= 2 || page >= pageCount - 1) return;

    if (page === pages[2]) {
      const newPagesArr = [...pages];
      newPagesArr.push(page + 1);
      newPagesArr.shift();

      setPages(newPagesArr);
    } else if (page === pages[0]) {
      const newPagesArr = [...pages];
      newPagesArr.unshift(page - 1);
      newPagesArr.pop();

      setPages(newPagesArr);
    }
  };

  const handleRightArrowClick = page => {
    setCurrentPage(page);

    const newOffset = ((page - 1) * itemsPerPage) % data.length;
    setItemOffset(newOffset);

    if (page <= 2) return;
    if (page >= pageCount - 1) return;

    if (page === pages[2]) {
      const newPagesArr = [...pages];
      newPagesArr.push(page + 1);
      newPagesArr.shift();

      setPages(newPagesArr);
    }
  };

  const handleLeftArrowClick = page => {
    setCurrentPage(page);

    const newOffset = ((page - 1) * itemsPerPage) % data.length;
    setItemOffset(newOffset);

    if (page <= 2) return;
    if (page >= pageCount - 1) return;

    if (page === pages[0]) {
      const newPagesArr = [...pages];
      newPagesArr.unshift(page - 1);
      newPagesArr.pop();

      setPages(newPagesArr);
    }
  };

  const values = {
    currentItems,
    pageCount,
    handlePageClick,
    handleRightArrowClick,
    handleLeftArrowClick,
    pages,
    qPage,
    setQPage,
    currentPage,
    resetGallery,
    setData,
    isSearching,
    setIsSearching,
  };

  return (
    <GalleryContext.Provider value={values}>{children}</GalleryContext.Provider>
  );
};

export default GalleryProvider;
