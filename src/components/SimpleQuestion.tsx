import React, { ChangeEvent } from "react";
import { iSimpleQuestion, iTest } from "../types";

export const SimpleQuestion: React.FC<
  iSimpleQuestion & {
    isActive: boolean;
    currentTest: iTest;
    setCurrentTest(value: iTest): void;
  }
> = (props) => {
  return (
    <div className="quesComp">
      <div className="quesHeader">
        <h2>{props.question}</h2>
        <div className="grade">Mark: {props.gradeAmount}</div>
      </div>
      <div className="imgBlock">
        <img
          src={`${props.imgURL}`}
          alt={`${props.id} simple question image`}
        />
      </div>
      <div className="optionsComp">
        {props.optionsArr.map((option) => (
          <div className="optionInput">
            <label>{option.answer}</label>
            <input
              className="radInp"
              type="radio"
              name={`${props.id}`}
              key={option.id}
              checked={props.isActive ? option.isCorrect : undefined}
              disabled={!props.isActive}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                props.setCurrentTest({
                  ...props.currentTest,
                  questionArr: props.currentTest.questionArr.map((ques) => {
                    if (ques.id == props.id) {
                      return {
                        ...ques,
                        correctOptionId: option.id,
                        optionsArr: props.optionsArr.map((opt) => {
                          if (opt.id == option.id) {
                            return { ...opt, isCorrect: true };
                          } else {
                            return { ...opt, isCorrect: false };
                          }
                        }),
                      };
                    } else {
                      return ques;
                    }
                  }),
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
