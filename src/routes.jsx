import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Landing } from "./views/landing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}>
        <Route
          index
          element={<Landing />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
