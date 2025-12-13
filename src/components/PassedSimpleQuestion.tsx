import React, { useEffect, useState } from "react";
import { iInitialState, iSimpleQuestion, iTest } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "..";

export const PassedSimpleQuestion: React.FC<
  iSimpleQuestion & {
    currentTest: iTest;
    isHiddenCorrectAnswers: boolean;
    setTotalMark: (value: number | ((prev: number) => number)) => void;
  }
> = (props) => {
  const { testArr }: iInitialState = useSelector((state: RootState) => state);
  const currentTest = testArr.find((test) => test.id == props.currentTest.id);

  const [currentCorrectQuestion, setCurrentCorrectQuestion] = useState<
    iSimpleQuestion | undefined
  >(undefined);

  const [mark, setMark] = useState<number>(0);

  useEffect(() => {
    const simpleQuests: iSimpleQuestion[] | undefined =
      currentTest?.questionArr.filter((ques) => ques.type == "Simple");

    const currentQues: iSimpleQuestion | undefined = simpleQuests?.find(
      (ques) => ques.id == props.id
    );

    if (currentQues) {
      setCurrentCorrectQuestion(currentQues);
    }
  }, []);

  useEffect(() => {
    props.correctOptionId == currentCorrectQuestion?.correctOptionId
      ? setMark(props.gradeAmount)
      : 0;
  }, [currentCorrectQuestion]);

  useEffect(() => {
    props.setTotalMark((prev) => prev + mark);
  }, [mark]);

  return (
    <div>
      <div>
        <h2>{props.question}</h2>
        <img
          src={`${props.imgURL}`}
          alt={`${props.id} simple question image`}
        />
      </div>
      <div>
        {currentCorrectQuestion?.optionsArr.map((option) => (
          <div
            style={
              !props.isHiddenCorrectAnswers
                ? {
                    border: ` 1px solid ${
                      option.id == props.correctOptionId && !option.isCorrect
                        ? "red"
                        : option.isCorrect
                        ? "green"
                        : "grey"
                    }`,
                  }
                : undefined
            }
          >
            <label>
              {option.answer}
              <input
                disabled
                type="radio"
                checked={
                  !props.isHiddenCorrectAnswers
                    ? props.optionsArr.find((op) => op.id == option.id)
                        ?.isCorrect
                    : false
                }
              />
            </label>
          </div>
        ))}
      </div>
      {!props.isHiddenCorrectAnswers ? (
        <div>Mark: {Math.round(mark * 100) / 100}</div>
      ) : null}
    </div>
  );
};
