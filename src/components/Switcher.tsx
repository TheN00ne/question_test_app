import React from "react";

export const Switcher: React.FC<{
  info: string;
  switchValue: boolean;
  switchFunc: (value: boolean) => void;
}> = (props) => {
  return (
    <div>
      <p>{props.info}</p>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          props.switchFunc(!props.switchValue);
        }}
      >
        <div>{props.switchValue == true ? "|" : "O"}</div>
      </div>
    </div>
  );
};
