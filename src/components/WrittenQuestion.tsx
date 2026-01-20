import React, { ChangeEvent } from "react";
import { iTest, iWrittenQuestion } from "../types";

export const WrittenQuestion: React.FC<
  iWrittenQuestion & {
    isActive: boolean;
    currentTest: iTest;
    setCurrentTest(value: iTest): void;
  }
> = (props) => {
  return (
    <div className="quesComp">
      <div className="quesHeader">
        <h2>Written question</h2>
        <div className="grade">Mark: {props.gradeAmount}</div>
      </div>
      <div className="imgBlock">
        <img
          src={`${props.imgURL}`}
          alt={`${props.id} multiple question image`}
        />
      </div>
      <textarea
        className="writtenAns"
        placeholder="Write the answer..."
        value={!props.isActive ? props.correctAnswer : undefined}
        disabled={!props.isActive}
        onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
          props.setCurrentTest({
            ...props.currentTest,
            questionArr: props.currentTest.questionArr.map((ques) => {
              if (ques.id == props.id) {
                return { ...ques, correctAnswer: e.currentTarget.value };
              } else {
                return ques;
              }
            }),
          });
        }}
      ></textarea>
    </div>
  );
};
