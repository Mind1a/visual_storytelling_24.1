import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../header";
import styles from "./Layout.module.scss";

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const bgClass = isLandingPage ? styles.landingBg : styles.defaultBg;

  return (
    <div className={`${styles.layout} ${bgClass}`}>
      {!isLandingPage && <Header />}
      <main
        className={`${styles.main} ${!isLandingPage ? styles.mainDefault : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
