import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";

const useScreenshot = () => {
  const ref = useRef(null);

  const takeScreenshot = useCallback(async () => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "screenshot.png";
      link.click();
    }
  }, [ref]);

  return [ref, takeScreenshot];
};

export default useScreenshot;
