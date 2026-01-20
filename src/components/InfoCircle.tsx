import React from "react";

export const InfoCircle: React.FC<{
  isInfoShowed: boolean;
  setIsInfoShowed: (value: boolean) => void;
  info: string;
}> = (props) => {
  return (
    <div
      className="getInfo"
      onMouseEnter={(e: React.MouseEvent) => {
        props.setIsInfoShowed(true);
      }}
      onMouseLeave={(e: React.MouseEvent) => {
        props.setIsInfoShowed(false);
      }}
    >
      <div className="circleInfo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <path
            fill="#453a6d"
            d="M16 1.466C7.973 1.466 1.466 7.973 1.466 16c0 8.027 6.507 14.534 14.534 14.534c8.027 0 14.534-6.507 14.534-14.534c0-8.027-6.507-14.534-14.534-14.534zM14.757 8h2.42v2.574h-2.42V8zm4.005 15.622H16.1c-1.034 0-1.475-.44-1.475-1.496V15.26c0-.33-.176-.483-.484-.483h-.88V12.4h2.663c1.035 0 1.474.462 1.474 1.496v6.887c0 .31.176.484.484.484h.88v2.355z"
          />
        </svg>
      </div>
      {props.isInfoShowed ? <div className="textInfo">{props.info}</div> : null}
      {/* <div className="textInfo">{props.info}</div> */}
    </div>
  );
};
