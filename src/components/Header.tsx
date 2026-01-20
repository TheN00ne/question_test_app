import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.scss";

export const Header: React.FC<{ headerText: string }> = (props) => {
  return (
    <header className={"header"}>
      <div className={"header-container"}>
        <Link to="/">Logo</Link>
        <h1>{props.headerText}</h1>
      </div>
    </header>
  );
};
