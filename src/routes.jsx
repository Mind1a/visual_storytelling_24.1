import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./components/layout";
import { Landing } from "./views/landing";
import { Home } from "./views/home";
import { Gallery } from "./views/gallery";
import { Guide } from "./views/guide";
import { About } from "./views/about";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}>
      <Route
        index
        element={<Landing />}
      />
      <Route
        path="home"
        element={<Home />}
      />
      <Route
        path="gallery"
        element={<Gallery />}
      />
      <Route
        path="guide"
        element={<Guide />}
      />
      <Route
        path="about"
        element={<About />}
      />
    </Route>,
  ),
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
