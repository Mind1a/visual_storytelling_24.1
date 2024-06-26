import styles from "./Filters.module.scss";
import searchIcon from "../../../assets/images/search-icon.png";
import { useContext, useEffect, useState } from "react";
import { GalleryContext } from "../../../context/features/galleryContext";
import { galleryData } from "../../../data";
import { useNavigate } from "react-router-dom";

const Filters = ({ removeQueryParam }) => {
  const [filterTypes, setFilterTypes] = useState([]);

  const { setData, resetGallery } = useContext(GalleryContext);

  const navigate = useNavigate();

  const handleCheckbox = e => {
    if (e.target.checked) {
      setFilterTypes(prev => [...prev, e.target.value]);
    } else {
      const newArr = filterTypes.filter(type => type !== e.target.value);
      setFilterTypes(newArr);
    }
  };

  const handleFilter = () => {
    if (filterTypes.length) {
      if (filterTypes.length > 1) {
        setData(galleryData);
        resetGallery();
        navigate("/gallery");
      } else {
        const filteredData = galleryData.filter(
          item => item.type === filterTypes[0],
        );
        setData(filteredData);
        resetGallery();
        navigate({
          pathname: "/gallery",
          search: `type=${filterTypes[0]}`,
        });
      }
    } else {
      setData(galleryData);
      removeQueryParam("type");
    }
  };

  useEffect(() => {
    handleFilter();
  }, [filterTypes]);

  return (
    <>
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
          />
        </div>
      </form>
      <section className={styles.checkboxes}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="noun"
            id="noun"
            value="noun"
            onChange={e => handleCheckbox(e)}
          />
          <label htmlFor="noun">არსებითი სახელი</label>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="verb"
            id="verb"
            value="verb"
            onChange={e => handleCheckbox(e)}
          />
          <label htmlFor="verb">ზმნა</label>
        </div>
      </section>
    </>
  );
};

export default Filters;
