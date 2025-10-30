import React from "react";
import { Header } from "./Header";
import { Link } from "react-router-dom";

export const MainPage: React.FC = () => {
  return (
    <div>
      <Header headerText="Tests" />
      <h1>Hello</h1>
      <footer>
        <Link to="/create">
          <div>+</div>
        </Link>
      </footer>
    </div>
  );
};
