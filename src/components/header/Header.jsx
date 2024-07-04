import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "../navigation";
import styles from "./Header.module.scss";
import Logo from "./../../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const reload = () => {
    if (location.pathname === "/home") {
      window.location.reload();
    } else {
      navigate("/home");
    }
  };

  return (
    <header className={styles.header}>
      <div
        onClick={reload}
        className={styles.logo}>
        <img
          src={Logo}
          alt="Logo"
        />
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
