import React from "react";

export const InfoCircle: React.FC<{
  isInfoShowed: boolean;
  setIsInfoShowed: (value: boolean) => void;
}> = (props) => {
  return (
    <div
      onMouseEnter={(e: React.MouseEvent) => {
        props.setIsInfoShowed(true);
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        props.setIsInfoShowed(false);
      }}
    >
      <div>i</div>
      {props.isInfoShowed ? (
        <div>
          When the hard mode is enabled, a grade will only be given when{" "}
          <b>all answers </b> are correct.
        </div>
      ) : null}
    </div>
  );
};
