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
    <div>
      <div>
        <h2>{props.question}</h2>
        <img
          src={`${props.imgURL}`}
          alt={`${props.id} simple question image`}
        />
        <div>{props.gradeAmount}</div>
      </div>
      <div>
        {props.optionsArr.map((option) => (
          <div>
            <label>
              {option.answer}
              <input
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
                disabled={!props.isActive}
                name={`${props.id}`}
                key={option.id}
                type="radio"
                checked={props.isActive ? option.isCorrect : false}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
