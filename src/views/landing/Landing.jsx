import { useNavigate } from "react-router-dom";
import { Video } from "../../components/video";

const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home", { replace: true });
  };

  return (
    <div className="landing-container">
      <h1 className="title">ვიზუალური თხრობა</h1>
      <Video />
      <button
        className="landing-btn"
        onClick={handleStart}>
        გაგრძელება
      </button>
    </div>
  );
};

export default Landing;
