import { useNavigate } from "react-router-dom";
import { Video } from "../../components/video";
import styles from "./Landing.module.scss";

const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home");
  };

  return (
    <div className={styles["landing-container"]}>
      <h1 className={styles.title}>ვიზუალური თხრობა</h1>
      <Video />
      <button
        className={styles["landing-btn"]}
        onClick={handleStart}>
        გაგრძელება
      </button>
    </div>
  );
};

export default Landing;
