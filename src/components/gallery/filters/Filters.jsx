import styles from "./Filters.module.scss";
import { useContext, useEffect, useState } from "react";
import { GalleryContext } from "../../../context/features/galleryContext";
import { galleryData } from "../../../data";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "./search";

const Filters = () => {
  const [filterTypes, setFilterTypes] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const { setData, resetGallery, isSearching, setIsSearching } =
    useContext(GalleryContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qType = searchParams.get("type");

  const handleCheckbox = e => {
    if (e.target.checked) {
      setFilterTypes(prev => [...prev, e.target.value]);
    } else {
      const newArr = filterTypes.filter(type => type !== e.target.value);
      setFilterTypes(newArr);
    }
  };

  const handleFilter = () => {
    setIsFilterActive(true);

    if (filterTypes.length) {
      if (filterTypes.length > 1) {
        setData(galleryData);
        navigate("/gallery");
      } else {
        const filteredData = galleryData.filter(
          item => item.type === filterTypes[0],
        );
        setData(filteredData);

        navigate({
          pathname: "/gallery",
          search: `type=${filterTypes[0]}`,
        });

        setIsSearching(false);
      }
      resetGallery();
    } else {
      setData(galleryData);
      if (isFilterActive) {
        navigate("/gallery");
        resetGallery();
      }
    }
  };

  useEffect(() => {
    if (qType) {
      setFilterTypes([qType]);
      setIsFilterActive(true);
    }
  }, [qType]);

  useEffect(() => {
    handleFilter();
  }, [filterTypes]);

  useEffect(() => {
    if (isSearching) {
      setFilterTypes([]);
    }
  }, [isSearching]);

  return (
    <>
      <Search />
      <section className={styles.checkboxes}>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="noun"
            id="noun"
            value="noun"
            onChange={e => handleCheckbox(e)}
            checked={filterTypes.includes("noun")}
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
            checked={filterTypes.includes("verb")}
          />
          <label htmlFor="verb">ზმნა</label>
        </div>
      </section>
    </>
  );
};

export default Filters;
