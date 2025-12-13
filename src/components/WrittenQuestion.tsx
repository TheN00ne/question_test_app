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
    <div>
      <h1>Written question</h1>
      <textarea
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
