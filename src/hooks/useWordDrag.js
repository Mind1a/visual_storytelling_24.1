import { createRef } from "react";
import { refKeys } from "../utils";

const useWordDrag = ({ step, handleSelect, setHighlightedBox, getSteps }) => {
  const refs = refKeys.reduce((acc, key) => {
    acc[key] = createRef();
    return acc;
  }, {});

  const handleDragStart = () => {
    const boxType = getSteps(step);
    setHighlightedBox(boxType);
  };

  const handleDragEnd = (event, info, item) => {
    setHighlightedBox(null);
    const boxType = getSteps(step);
    const targetRef = refs[boxType];

    if (isInBox(info, targetRef)) {
      handleSelect(item, boxType);
    }
  };

  const isInBox = (info, boxRef) => {
    if (!boxRef.current) return false;
    const box = boxRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    return (
      info.point.x >= box.left + scrollX &&
      info.point.x <= box.right + scrollX &&
      info.point.y >= box.top + scrollY &&
      info.point.y <= box.bottom + scrollY
    );
  };

  return { refs, handleDragStart, handleDragEnd };
};

export default useWordDrag;
