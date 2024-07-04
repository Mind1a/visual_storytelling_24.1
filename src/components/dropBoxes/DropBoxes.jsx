import { Card } from "../cards/Card";
import styles from "./DropBoxes.module.scss";

export const DropBoxes = ({ words, selectedWords, refs, highlighted }) => {
  const boxStyleMap = {
    noun1: styles.nounBox,
    noun2: styles.nounBox,
    noun3: styles.nounBox,
    verb: styles.verbBox,
    sign1: styles.signBox,
    sign2: words === 4 ? styles.adpositionBox : styles.signBox,
    sign3: styles.signBox,
  };

  const generateBoxStyles = boxType => {
    return boxStyleMap[boxType] || "";
  };

  const boxSize = words === 3 ? styles.bigBox : styles.smallBox;

  return (
    <div className={styles.wrapper}>
      {selectedWords &&
        Object.entries(selectedWords).map(([boxType, selectedItem]) => (
          <div
            className={`${generateBoxStyles(boxType)} ${highlighted === boxType ? styles.highlighted : ""} ${boxSize}`}
            key={boxType}
            ref={refs[boxType]}>
            {selectedItem && (
              <div className={styles.card}>
                <Card item={selectedItem} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
