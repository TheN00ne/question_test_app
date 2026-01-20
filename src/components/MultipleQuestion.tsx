import React, { ChangeEvent } from "react";
import { iMultipleQuestion, iTest } from "../types";

export const MultipleQuestion: React.FC<
  iMultipleQuestion & {
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
          alt={`${props.id} multiple question image`}
        />
      </div>
      <div className="optionsComp">
        {props.optionsArr.map((option) => (
          <div className="optionInput">
            <label>{option.answer}</label>
            <input
              className="checkInp"
              type="checkbox"
              name={`${option.id}`}
              key={props.id}
              checked={!props.isActive ? option.isCorrect : undefined}
              disabled={!props.isActive}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                props.setCurrentTest({
                  ...props.currentTest,
                  questionArr: props.currentTest.questionArr.map((ques) => {
                    if (ques.id == props.id && ques.type == "Multiple") {
                      return {
                        ...ques,
                        correctOptionsId: option.isCorrect
                          ? ques.correctOptionsId.filter(
                              (id) => id !== option.id
                            )
                          : [...ques.correctOptionsId, option.id],
                        optionsArr: props.optionsArr.map((opt) => {
                          if (opt.id == option.id) {
                            return { ...opt, isCorrect: !opt.isCorrect };
                          } else {
                            return opt;
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
