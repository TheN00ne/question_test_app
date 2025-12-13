import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { iTest } from "../types";
import { SimpleQuestion } from "./SimpleQuestion";
import { MultipleQuestion } from "./MultipleQuestion";
import { MatchQuestion } from "./MatchQuestion";
import { WrittenQuestion } from "./WrittenQuestion";
import { Header } from "./Header";

export const TestPage: React.FC = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [currentTest, setCurrentTest] = useState<iTest | undefined>(undefined);

  const [secondsAmount, setSecondsAmount] = useState<number>(0);
  const [minutesAmount, setMinutesAmount] = useState<number>(0);
  const [hoursAmount, setHoursAmount] = useState<number>(0);

  const [isTestActive, setIsTestActive] = useState(true);

  const intervalRef = useRef<undefined | number>(undefined);

  useEffect(() => {
    setLoading(true);
    const currentTest: iTest = state.test;

    if (currentTest) {
      setCurrentTest(currentTest);
      if (currentTest.isSetTimer) {
        let timeLeft: number = currentTest.timeout!;
        let hoursAmount: number = 0;
        let minutesAmount: number = 0;
        while (timeLeft > 3600) {
          timeLeft -= 3600;
          hoursAmount += 1;
        }
        while (timeLeft > 60 && timeLeft < 3600) {
          timeLeft -= 60;
          minutesAmount += 1;
        }
        setHoursAmount(hoursAmount);
        setMinutesAmount(minutesAmount);
        setSecondsAmount(timeLeft);
      }
    } else {
      setError("Can not find this test");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      //Пишу window, бо TS не розуміє, де пищуть код: в браузері чи в NodeJS, тому пишимо window, щоб вказати, що працюємо в браузері
      setSecondsAmount((prevSec) => {
        if (prevSec > 0) {
          return prevSec - 1;
        }
        setMinutesAmount((prevMin) => {
          if (prevMin > 0) {
            setSecondsAmount(59);
            return prevMin - 1;
          }
          setHoursAmount((prevHour) => {
            if (prevHour > 0) {
              setSecondsAmount(59);
              setMinutesAmount(59);
              return prevHour - 1;
            }
            clearInterval(intervalRef.current);
            setIsTestActive(false);
            return 0;
          });
          return 0;
        });
        return 0;
      });
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header headerText="Tests" />
      <div>
        {!isTestActive ? (
          <div>
            <h1>Out of time!</h1>
            <Link to={`/passedTest/${id}`} state={{ test: currentTest }}>
              Pass the test
            </Link>
          </div>
        ) : null}
        <div>
          <h1>{currentTest?.title}</h1>
          <p>{currentTest?.description}</p>
          <img src={`${currentTest?.imgURL}`} alt={`${currentTest?.id} test`} />
          <div>{currentTest?.totalMark}</div>
          {currentTest?.isSetTimer ? (
            <div>
              <span>{hoursAmount}</span>:<span>{minutesAmount}</span>:
              <span>{secondsAmount}</span>
            </div>
          ) : null}
        </div>
        <div>
          {currentTest?.questionArr.map((question) => {
            if (question.type == "Simple") {
              return (
                <SimpleQuestion
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  type={question.type}
                  imgURL={question.imgURL}
                  correctOptionId={question.correctOptionId}
                  gradeAmount={question.gradeAmount}
                  optionsArr={question.optionsArr}
                  isActive={isTestActive}
                  currentTest={currentTest}
                  setCurrentTest={setCurrentTest}
                />
              );
            } else if (question.type == "Multiple") {
              return (
                <MultipleQuestion
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  type={question.type}
                  imgURL={question.imgURL}
                  correctOptionsId={question.correctOptionsId}
                  isHardModeOn={question.isHardModeOn}
                  gradeAmount={question.gradeAmount}
                  optionsArr={question.optionsArr}
                  isActive={isTestActive}
                  currentTest={currentTest}
                  setCurrentTest={setCurrentTest}
                />
              );
            } else if (question.type == "Match") {
              return (
                <MatchQuestion
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  type={question.type}
                  imgURL={question.imgURL}
                  pairs={question.pairs}
                  isHardModeOn={question.isHardModeOn}
                  gradeAmount={question.gradeAmount}
                  isActive={isTestActive}
                  currentTest={currentTest}
                  setCurrentTest={setCurrentTest}
                />
              );
            } else {
              return (
                <WrittenQuestion
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  type={question.type}
                  imgURL={question.imgURL}
                  gradeAmount={question.gradeAmount}
                  correctAnswer={question.correctAnswer}
                  isActive={isTestActive}
                  currentTest={currentTest}
                  setCurrentTest={setCurrentTest}
                />
              );
            }
          })}
        </div>
        <Link to={`/passedTest/${id}`} state={{ test: currentTest }}>
          Pass the test
        </Link>
      </div>
    </div>
  );
};
