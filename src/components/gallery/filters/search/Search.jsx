import styles from "./Search.module.scss";
import searchIcon from "../../../../assets/images/search-icon.png";
import { useContext, useEffect, useState } from "react";
import { galleryData } from "../../../../data";
import { GalleryContext } from "../../../../context/features/galleryContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQ, setSearchQ] = useState("");

  const { setData, setIsSearching, resetGallery } = useContext(GalleryContext);

  const navigate = useNavigate();

  useEffect(() => {
    let timeout;

    if (searchQ) {
      resetGallery();
      navigate("/gallery");
      timeout = setTimeout(() => {
        setIsSearching(true);
        const newSearchedData = galleryData.filter(item =>
          item.word.toLowerCase().includes(searchQ.toLowerCase()),
        );
        setData(newSearchedData.slice(0, 8));
      }, 100);
    } else {
      setData(galleryData);
      setIsSearching(false);
    }

    return () => clearTimeout(timeout);
  }, [searchQ, setData, setIsSearching]);

  return (
    <form className={styles.searchForm}>
      <div className={styles.searchBox}>
        <img
          src={searchIcon}
          alt="search"
          className={styles.searchIcon}
        />
        <input
          type="search"
          name="search"
          id="search"
          placeholder="ძიება..."
          className={styles.searchInput}
          value={searchQ}
          onChange={e => setSearchQ(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
