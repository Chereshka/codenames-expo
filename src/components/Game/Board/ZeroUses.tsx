import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setHideLabels } from "@/redux/Slices/Game";
import React, { FC, useRef } from "react";

type Props = {
  label: string;
};

const ZeroUses: FC<Props> = ({ label }) => {
  // const classes = classNames("wordpiece-completed");

  const dispatch = useAppDispatch();

  const hide = useAppSelector((r) => r.game.hideLabels);

  const onClick = () => {
    if (hide) {
      dispatch(setHideLabels(false));
    } else {
      dispatch(setHideLabels(true));
    }
  };

  const handleStuff = () => {
    if (!hide) {
      dispatch(setHideLabels(true));
    }
  };

  const ref = useRef<any>();

  useOnClickOutside(ref, handleStuff);

  return (
    <div
      ref={ref}
      // id={label}
      style={{ zIndex: 1 }}
      // className={classes}
      onClick={onClick}
    >
      {/* <div id={`inner-${label}`}> */}
      <div>
        {hide && (
          <svg width="32" height="32" viewBox="0 0 45.701 45.7">
            <path
              d="M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504
        c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0
        c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z"
            />
          </svg>
        )}
        {!hide && <div className="wordpiece__label no-uses">{label}</div>}
      </div>
    </div>
  );
};

export default ZeroUses;
