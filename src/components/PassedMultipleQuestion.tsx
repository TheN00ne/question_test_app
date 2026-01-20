import React, { useEffect, useState } from "react";
import { iInitialState, iMultipleQuestion, iTest } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "..";

export const PassedMultipleQuestion: React.FC<
  iMultipleQuestion & {
    currentTest: iTest;
    isHiddenCorrectAnswers: boolean;
    setTotalMark: (value: number | ((prev: number) => number)) => void;
  }
> = (props) => {
  const { testArr }: iInitialState = useSelector((state: RootState) => state);
  const currentTest = testArr.find((test) => test.id == props.currentTest.id);

  const [currentCorrectQuestion, setCurrentCorrectQuestion] = useState<
    iMultipleQuestion | undefined
  >(undefined);

  const [mark, setMark] = useState<number>(0);

  useEffect(() => {
    const multipleQuests: iMultipleQuestion[] | undefined =
      currentTest?.questionArr.filter((ques) => ques.type == "Multiple");

    const currentQues: iMultipleQuestion | undefined = multipleQuests?.find(
      (ques) => ques.id == props.id,
    );

    if (currentQues) {
      setCurrentCorrectQuestion(currentQues);
    }
  }, []);

  useEffect(() => {
    if (!currentCorrectQuestion) {
      setMark(0);
      return;
    } else {
      if (props.isHardModeOn) {
        for (let op of props.optionsArr) {
          if (
            op.isCorrect !==
            currentCorrectQuestion?.optionsArr.find((o) => o.id == op.id)
              ?.isCorrect
          ) {
            setMark(0);
            return;
          }
        }
        setMark(props.gradeAmount);
      } else {
        let amount = 0;
        for (let op of props.optionsArr) {
          if (
            op.isCorrect &&
            currentCorrectQuestion?.optionsArr.find((o) => o.id == op.id)
              ?.isCorrect
          ) {
            amount++;
          } else if (
            op.isCorrect &&
            !currentCorrectQuestion?.optionsArr.find((o) => o.id == op.id)
              ?.isCorrect
          ) {
            amount--;
          }
        }
        if (amount < 0) {
          setMark(0);
        } else {
          setMark(
            amount *
              (props.gradeAmount /
                currentCorrectQuestion!.correctOptionsId.length),
          );
        }
      }
    }
  }, [currentCorrectQuestion]);

  useEffect(() => {
    props.setTotalMark((prev) => prev + mark);
  }, [mark]);

  return (
    <div className="quesComp">
      <div className="quesHeader">
        <h2>{props.question}</h2>
        {!props.isHiddenCorrectAnswers ? (
          <div className="grade">Mark: {Math.round(mark * 100) / 100}</div>
        ) : null}
      </div>
      <div className="imgBlock">
        <img
          src={`${props.imgURL}`}
          alt={`${props.id} multiple question image`}
        />
      </div>
      <div className="optionsComp">
        {currentCorrectQuestion?.optionsArr.map((option) => (
          <div
            className="optionInput"
            style={
              !props.isHiddenCorrectAnswers
                ? {
                    backgroundColor: `${
                      option.id ==
                        props.correctOptionsId.find((id) => id == option.id) &&
                      !option.isCorrect
                        ? "red"
                        : option.isCorrect
                          ? "green"
                          : "#7f809f"
                    }`,
                  }
                : undefined
            }
          >
            <label>{option.answer}</label>
            <input
              className="checkInp"
              disabled
              type="checkbox"
              checked={
                !props.isHiddenCorrectAnswers
                  ? props.optionsArr.find((op) => op.id == option.id)?.isCorrect
                  : false
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
