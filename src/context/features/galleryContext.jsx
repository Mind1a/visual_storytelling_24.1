import { createContext, useEffect, useState } from "react";
import { galleryData } from "../../data";

export const GalleryContext = createContext();

const itemsPerPage = 8;

const GalleryProvider = ({ children }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pages, setPages] = useState([]);
  const [curentPage, setCurrentPage] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = galleryData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(galleryData.length / itemsPerPage);

  useEffect(() => {
    const currPages = [...Array(pageCount + 1).keys()].slice(2, 4);
    setPages(currPages);
  }, []);

  const handlePageClick = page => {
    setCurrentPage(page);

    const newOffset = (page * itemsPerPage) % galleryData.length;
    setItemOffset(newOffset);

    if (page === 0) {
      setPages([2, 3]);
    }

    if (page === pageCount) {
      setPages([pageCount - 2, pageCount - 1]);
    }

    if (page <= 2 || page === pageCount) return;

    const lastPageNum = pages[1];

    if (page === lastPageNum) {
      const newPagesArr = [...pages];
      newPagesArr.push(page + 1);
      newPagesArr.shift();

      setPages(newPagesArr);
    } else {
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
    pages,
    curentPage,
  };

  return (
    <GalleryContext.Provider value={values}>{children}</GalleryContext.Provider>
  );
};

export default GalleryProvider;
