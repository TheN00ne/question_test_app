import { Link, useParams } from "react-router-dom";
import { iInitialState, iMatchPair, iMatchQuestion, iTest } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "..";
import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { SimpleQuestion } from "./SimpleQuestion";
import { MultipleQuestion } from "./MultipleQuestion";
import { MatchQuestion } from "./MatchQuestion";
import { WrittenQuestion } from "./WrittenQuestion";

const TestPageView: React.FC = () => {
  const { id } = useParams();

  let { testArr }: iInitialState = useSelector((state: RootState) => state);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [emptyCurrentTest, setEmptyCurrentTest] = useState<iTest | undefined>(
    undefined
  );

  const [secondsAmount, setSecondsAmount] = useState<number | undefined>(
    undefined
  );
  const [minutesAmount, setMinutesAmount] = useState<number | undefined>(
    undefined
  );
  const [hoursAmount, setHoursAmount] = useState<number | undefined>(undefined);

  const getRandomPairs: (value: iMatchQuestion) => iMatchPair[] = (
    ques: iMatchQuestion
  ) => {
    let pairsIdArr: number[] = [...ques.pairs.map(({ id }) => id)];

    return ques.pairs.map((pair) => {
      const [randomPairId] = pairsIdArr.splice(
        Math.round(Math.random() * (pairsIdArr.length - 1)),
        1
      );

      return {
        ...pair,
        answer:
          ques.pairs[ques.pairs.findIndex(({ id }) => id == randomPairId)]
            .answer,
      };
    });
  };

  useEffect(() => {
    setLoading(true);
    const currentTest = testArr.find((test) => test.id == Number(id));
    if (currentTest) {
      const emptyTest: iTest = {
        ...currentTest,
        questionArr: currentTest.questionArr.map((ques) =>
          ques.type == "Simple"
            ? {
                ...ques,
                correctOptionId: undefined,
                optionsArr: ques.optionsArr.map((opt) => ({
                  ...opt,
                  isCorrect: false,
                })),
              }
            : ques.type == "Multiple"
            ? {
                ...ques,
                correctOptionsId: [],
                optionsArr: ques.optionsArr.map((opt) => ({
                  ...opt,
                  isCorrect: false,
                })),
              }
            : ques.type == "Match"
            ? { ...ques, pairs: getRandomPairs(ques) }
            : { ...ques, correctAnswer: "" }
        ),
      };
      setEmptyCurrentTest(emptyTest);
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
      setError(`There is no test with id ${id}`);
    }
    setLoading(false);
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
        <div className="infoBlock">
          <div className="headerInfo">
            <div className="totalMark">
              Total mark: {emptyCurrentTest?.totalMark}
            </div>
            {emptyCurrentTest?.isSetTimer ? (
              <div className="timer">
                <span>
                  {hoursAmount! > 9 ? hoursAmount : `0${hoursAmount}`}
                </span>
                :
                <span>
                  {minutesAmount! > 9 ? minutesAmount : `0${minutesAmount}`}
                </span>
                :
                <span>
                  {secondsAmount! > 9 ? secondsAmount : `0${secondsAmount}`}
                </span>
              </div>
            ) : null}
          </div>
          <div className="bodyInfo">
            <h1>{emptyCurrentTest?.title}</h1>
            <p>{emptyCurrentTest?.description}</p>
            <img
              src={`${emptyCurrentTest?.imgURL}`}
              alt={`${emptyCurrentTest?.id} test`}
            />
          </div>
        </div>
        <div className="questionContainer">
          {!emptyCurrentTest?.isHiddenQuestions
            ? emptyCurrentTest?.questionArr.map((question) => {
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
                      isActive={false}
                      currentTest={emptyCurrentTest}
                      setCurrentTest={setEmptyCurrentTest}
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
                      isActive={false}
                      currentTest={emptyCurrentTest}
                      setCurrentTest={setEmptyCurrentTest}
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
                      isActive={false}
                      currentTest={emptyCurrentTest}
                      setCurrentTest={setEmptyCurrentTest}
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
                      isActive={false}
                      currentTest={emptyCurrentTest}
                      setCurrentTest={setEmptyCurrentTest}
                    />
                  );
                }
              })
            : null}
        </div>
        <div className="bottomComp">
          <Link
            className="testBtn"
            to={`/test/${id}`}
            state={{ test: emptyCurrentTest }}
          >
            Start test
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestPageView;
