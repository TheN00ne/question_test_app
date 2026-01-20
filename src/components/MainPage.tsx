import React, { useMemo, useState } from "react";
import { lazy, Suspense } from "react";
import { RootState } from "..";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { iInitialState, iTest } from "../types";
import { useSelector } from "react-redux";
import { SearchInput } from "./SearchInput";

const LazyTestIcon = lazy(() => import("./TestIcon"));

const MainPage: React.FC = () => {
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
        <div className={"itemsContainer"}>
          {filteredMemoTestArr.map((test) => (
            <Suspense fallback={<div>Loading...</div>}>
              <LazyTestIcon
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
            </Suspense>
          ))}
        </div>
        <div className={"bottomPart"}>
          <button
            className={"showMoreBtn"}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setVisibleTestCount((prev) => prev + 4);
            }}
          >
            Show more
          </button>
        </div>
        <Link className={"createTestBtn"} to="/create">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
              fill="#d9d9d9"
              d="M10 0c.423 0 .766.343.766.766v8.467h8.468a.766.766 0 1 1 0 1.533h-8.468v8.468a.766.766 0 1 1-1.532 0l-.001-8.468H.766a.766.766 0 0 1 0-1.532l8.467-.001V.766A.768.768 0 0 1 10 0Z"
            />
          </svg>
        </Link>
      </main>
      <footer></footer>
    </div>
  );
};

export default MainPage;
