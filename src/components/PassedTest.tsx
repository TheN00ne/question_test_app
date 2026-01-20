import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { iInitialState, iTest } from "../types";
import { Header } from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { PassedSimpleQuestion } from "./PassedSimpleQuestion";
import { PassedMultipleQuestion } from "./PassedMultipleQuestion";
import { PassedMatchedQuestion } from "./PassedMatchQuestion";
import { PassWrittenQuestion } from "./PassedWrittenQuestion";

const PassedTest: React.FC = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [passedTest, setPassedTest] = useState<iTest | undefined>(undefined);

  const [secondsAmount, setSecondsAmount] = useState<number | undefined>(
    undefined,
  );
  const [minutesAmount, setMinutesAmount] = useState<number | undefined>(
    undefined,
  );
  const [hoursAmount, setHoursAmount] = useState<number | undefined>(undefined);

  const { testArr }: iInitialState = useSelector((state: RootState) => state);

  const currentTest = testArr.find((test) => test.id == Number(id));

  const [totalMark, setTotalMark] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const currentTest: iTest = state.test;
    if (currentTest) {
      setPassedTest(currentTest);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    <div>{error}</div>;
  }

  return (
    <div>
      <Header headerText="Tests" />
      <div>
        <div className="infoBlock">
          <div className="headerInfo">
            <div className="totalMark">
              Total mark: {currentTest?.totalMark}
            </div>
            {currentTest?.isSetTimer ? (
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
            <h1>{passedTest?.title}</h1>
            <p>{passedTest?.description}</p>
            <img src={`${passedTest?.imgURL}`} alt={`${passedTest?.id} test`} />
          </div>
        </div>
      </div>
      <div className="questionContainer">
        {passedTest?.questionArr.map((question) => {
          if (question.type == "Simple") {
            return (
              <PassedSimpleQuestion
                key={question.id}
                id={question.id}
                question={question.question}
                type={question.type}
                imgURL={question.imgURL}
                correctOptionId={question.correctOptionId}
                gradeAmount={question.gradeAmount}
                optionsArr={question.optionsArr}
                currentTest={passedTest}
                isHiddenCorrectAnswers={passedTest.isHiddenCorrectAnswers}
                setTotalMark={setTotalMark}
              />
            );
          } else if (question.type == "Multiple") {
            return (
              <PassedMultipleQuestion
                key={question.id}
                id={question.id}
                question={question.question}
                type={question.type}
                imgURL={question.imgURL}
                correctOptionsId={question.correctOptionsId}
                isHardModeOn={question.isHardModeOn}
                gradeAmount={question.gradeAmount}
                optionsArr={question.optionsArr}
                currentTest={passedTest}
                isHiddenCorrectAnswers={passedTest.isHiddenCorrectAnswers}
                setTotalMark={setTotalMark}
              />
            );
          } else if (question.type == "Match") {
            return (
              <PassedMatchedQuestion
                key={question.id}
                id={question.id}
                question={question.question}
                type={question.type}
                imgURL={question.imgURL}
                pairs={question.pairs}
                isHardModeOn={question.isHardModeOn}
                gradeAmount={question.gradeAmount}
                currentTest={passedTest}
                isHiddenCorrectAnswers={passedTest.isHiddenCorrectAnswers}
                setTotalMark={setTotalMark}
              />
            );
          } else {
            return (
              <PassWrittenQuestion
                key={question.id}
                id={question.id}
                question={question.question}
                type={question.type}
                imgURL={question.imgURL}
                gradeAmount={question.gradeAmount}
                correctAnswer={question.correctAnswer}
                currentTest={passedTest}
                isHiddenCorrectAnswers={passedTest.isHiddenCorrectAnswers}
                setTotalMark={setTotalMark}
              />
            );
          }
        })}
      </div>
      <div className="bottomComp">
        <div className="totalMark">
          Total Mark: {Math.round(totalMark * 100) / 100} /{" "}
          {currentTest?.totalMark}
        </div>
      </div>
    </div>
  );
};

export default PassedTest;
