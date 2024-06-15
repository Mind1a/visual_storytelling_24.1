import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

const routes = [
  { path: "home", label: "ნახატები და წინადადებები" },
  { path: "gallery", label: "გალერეა" },
  { path: "guide", label: "მასწავლებლის გზამკვლევი" },
  { path: "about", label: "პროექტის შესახებ" },
];

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      {routes.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => (isActive ? styles.active : "")}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
