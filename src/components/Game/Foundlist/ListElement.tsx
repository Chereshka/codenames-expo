import React, { FC, useMemo } from "react";

type ListElementProps = {
  words: string[];
  found: string[];
  pieces: number;
};
const ListElement: FC<ListElementProps> = ({ words, found, pieces }) => {
  const foundIn = useMemo(
    () => found.filter((e) => words.includes(e)),
    [words, found]
  );
  const startedSolving = foundIn.length > 0 || foundIn.length === words.length;
  if (words.length < 1) return <React.Fragment></React.Fragment>;

  return (
    <div className="foundwords__list-container">
      <div className="foundwords__list-caption-container">
        <div className="foundwords__list-caption">{pieces}-combos</div>
        {startedSolving && (
          <div
            className={
              words.length === foundIn.length
                ? "foundwords__list-counter filled"
                : "foundwords__list-counter"
            }
          >
            {words.length === foundIn.length
              ? "(solved)"
              : `(+${words.length - foundIn.length} words left)`}
          </div>
        )}
      </div>
      <ul className="foundwords__list">
        {startedSolving ? (
          foundIn.map((e) => (
            <li key={e} className="foundwords__element">
              {e}
            </li>
          ))
        ) : (
          <div className="foundwords__list-empty">
            {`(+${words.filter((e) => !found.includes(e)).length} words left)`}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ListElement;
