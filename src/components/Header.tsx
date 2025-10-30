import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC<{ headerText: string }> = (props) => {
  return (
    <header>
      <Link to="/">Logo</Link>
      <h1>{props.headerText}</h1>
    </header>
  );
};
