import React, { useState } from "react";
import { RootState } from "..";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { iInitialState } from "../types";
import { useSelector } from "react-redux";
import { TestIcon } from "./TestIcon";

export const MainPage: React.FC = () => {
  const { testArr }: iInitialState = useSelector((state: RootState) => state);

  return (
    <div>
      <Header headerText="Tests" />
      <main>
        {testArr.map((test) => (
          <TestIcon
            id={test.id}
            key={test.id}
            title={test.title}
            description={test.description}
            imgURL={test.imgURL}
            isSetTimer={test.isSetTimer}
            timeout={test.timeout}
            totalMark={test.totalMark}
            questionArr={test.questionArr}
            isHiddenQuestions={test.isHiddenQuestions}
            isHiddenCorrectAnswers={test.isHiddenCorrectAnswers}
          />
        ))}
      </main>
      <footer>
        <Link to="/create">
          <div>+</div>
        </Link>
      </footer>
    </div>
  );
};
