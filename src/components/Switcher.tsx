import React from "react";

export const Switcher: React.FC<{
  info: string;
  switchValue: boolean;
  switchFunc: (value: boolean) => void;
}> = (props) => {
  return (
    <div className={"switcherComp"}>
      <p className={"switcherText"}>{props.info}</p>
      <div
        className={"switcher"}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          props.switchFunc(!props.switchValue);
        }}
      >
        <div
          className={`switcherBall ${
            props.switchValue == true ? "switcherBallOn" : null
          }`}
        ></div>
      </div>
    </div>
  );
};
