import React, { useEffect, useState } from "react";
import { iInitialState, iTest, iWrittenQuestion } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "..";

export const PassWrittenQuestion: React.FC<
  iWrittenQuestion & {
    currentTest: iTest;
    isHiddenCorrectAnswers: boolean;
    setTotalMark: (value: number | ((prev: number) => number)) => void;
  }
> = (props) => {
  const { testArr }: iInitialState = useSelector((state: RootState) => state);
  const currentTest = testArr.find((test) => test.id == props.currentTest.id);

  const [currentCorrectQuestion, setCurrentCorrectQuestion] = useState<
    iWrittenQuestion | undefined
  >(undefined);

  const [mark, setMark] = useState<number>(0);

  useEffect(() => {
    const writtenQuestions: iWrittenQuestion[] | undefined =
      currentTest?.questionArr.filter((ques) => ques.type == "Written");

    const currentQues: iWrittenQuestion | undefined = writtenQuestions?.find(
      (ques) => ques.id == props.id
    );

    if (currentQues) {
      setCurrentCorrectQuestion(currentQues);
    }
  }, []);

  useEffect(() => {
    props.correctAnswer.trim().toLocaleLowerCase() ==
    currentCorrectQuestion?.correctAnswer.trim().toLocaleLowerCase()
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
          alt={`${props.id} written question image`}
        />
      </div>
      <div>
        <div>
          {!props.isHiddenCorrectAnswers ? (
            <div>
              {props.correctAnswer.trim().toLowerCase() !==
              currentCorrectQuestion?.correctAnswer.trim().toLowerCase() ? (
                <div>
                  <div style={{ border: "1px solid red" }}>
                    {props.correctAnswer}
                  </div>
                  <div style={{ border: "1px solid green" }}>
                    {currentCorrectQuestion?.correctAnswer}
                  </div>
                </div>
              ) : (
                <div style={{ border: "1px solid green" }}>
                  {props.correctAnswer}
                </div>
              )}
            </div>
          ) : (
            <div>{props.correctAnswer}</div>
          )}
        </div>
        {!props.isHiddenCorrectAnswers ? (
          <div>Mark: {Math.round(mark * 100) / 100}</div>
        ) : null}
      </div>
    </div>
  );
};
