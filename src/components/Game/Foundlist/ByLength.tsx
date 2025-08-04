import React, { FC } from "react";
import { Mapped } from ".";
import ListElement from "./ListElement";

type Props = {
  wordsFound: string[];
  wordsTotal: string[];
  bonusFound: string[];
  bonusTotal: string[];
  dailyBonus: string;
  List: Mapped;
};

const ByLength: FC<Props> = ({
  List,
  bonusFound,
  bonusTotal,
  dailyBonus,
  wordsFound,
  wordsTotal,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center mt-1 mb-1">
        <div className="scorebar__counter">
          Words found:{" "}
          <b>
            {wordsFound.length} / {wordsTotal.length}
          </b>
        </div>
      </div>
      {Object.keys(List).map((e) => {
        return (
          <ListElement
            pieces={parseInt(e)}
            key={e}
            found={wordsFound}
            words={List[parseInt(e)]}
          />
        );
      })}
      <div className="foundwords__list-container">
        <div className="foundwords__list-caption-container">
          <div className="foundwords__list-caption">Bonus words </div>
          <div
            className={
              bonusTotal.length === bonusFound.length
                ? "foundwords__list-counter filled"
                : "foundwords__list-counter"
            }
          >
            {bonusTotal.length === bonusFound.length
              ? "(solved)"
              : `(+${bonusTotal.length - bonusFound.length} words left)`}
          </div>
        </div>
        <ul className="foundwords__list">
          {bonusFound.map((e) => (
            <li
              key={e}
              className={
                e === dailyBonus
                  ? "foundwords__element special"
                  : "foundwords__element"
              }
            >
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ByLength;
