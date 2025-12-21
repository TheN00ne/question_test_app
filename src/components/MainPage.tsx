import React, { useEffect, useMemo, useState } from "react";
import { RootState } from "..";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { iInitialState, iTest } from "../types";
import { useSelector } from "react-redux";
import { TestIcon } from "./TestIcon";
import { SearchInput } from "./SearchInput";

export const MainPage: React.FC = () => {
  const { testArr }: iInitialState = useSelector((state: RootState) => state);

  const [searchValue, setSearchValue] = useState<string>("");
  const [visibleTestCount, setVisibleTestCount] = useState<number>(4);

  const filteredMemoTestArr = useMemo(() => {
    let filteredTestArr: iTest[] = [];
    let currentTestsIndex = 0;

    for (let test of testArr) {
      if (currentTestsIndex == visibleTestCount) {
        break;
      }

      if (
        test.title
          .toLocaleLowerCase()
          .includes(searchValue.trim().toLocaleLowerCase()) ||
        test.description
          .toLocaleLowerCase()
          .includes(searchValue.trim().toLocaleLowerCase())
      ) {
        filteredTestArr.push(test);
        currentTestsIndex++;
      }
    }
    return filteredTestArr;
  }, [searchValue, visibleTestCount, testArr]);

  return (
    <div>
      <Header headerText="Tests" />
      <main>
        <SearchInput
          setSearchValue={setSearchValue}
          setVisibleTestCount={setVisibleTestCount}
        />
        {filteredMemoTestArr.map((test) => (
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
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            setVisibleTestCount((prev) => prev + 4);
          }}
        >
          Show more
        </button>
      </main>
      <footer>
        <Link to="/create">
          <div>+</div>
        </Link>
      </footer>
    </div>
  );
};
