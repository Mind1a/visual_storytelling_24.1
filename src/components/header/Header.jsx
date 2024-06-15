import { Link } from "react-router-dom";
import { Navigation } from "../navigation";
import styles from "./Header.module.scss";
import Logo from "./../../assets/images/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        to={"/home"}
        className={styles.logo}>
        <img
          src={Logo}
          alt="Logo"
        />
      </Link>
      <Navigation />
    </header>
  );
};

export default Header;
