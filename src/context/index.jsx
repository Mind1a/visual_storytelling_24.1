import GalleryProvider from "./features/galleryContext";

const ContextProvider = ({ children }) => {
  return <GalleryProvider>{children}</GalleryProvider>;
};

export default ContextProvider;
