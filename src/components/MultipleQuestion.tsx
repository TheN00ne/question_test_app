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
    <div>
      <div>
        <h2>{props.question}</h2>
        <img
          src={`${props.imgURL}`}
          alt={`${props.id} multiple question image`}
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
                name={`${option.id}`}
                disabled={!props.isActive}
                key={props.id}
                type="checkbox"
                checked={!props.isActive ? option.isCorrect : undefined}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
