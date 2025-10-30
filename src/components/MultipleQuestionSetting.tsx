import React, { ChangeEvent, MouseEvent, useState } from "react";
import {
  iRegularOption,
  iQuestion,
  iSimpleQuestion,
  iMultipleQuestion,
} from "../types";
import { Switcher } from "./Switcher";

export const MultipleQuestionSetting: React.FC<{
  id: number;
  testQuestions: iQuestion[];
  testQuestionsChangeFunc: (value: iQuestion[]) => void;
}> = (props) => {
  const changeQuestionTextInput = (text: string): iQuestion[] => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id) {
        return {
          ...ques,
          question: text,
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const changeQuestionImgURL = (imgURL: string): iQuestion[] => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id) {
        return {
          ...ques,
          imgURL: imgURL,
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const changeQuestionGradeAmount = (gradeAmount: number): iQuestion[] => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id) {
        return {
          ...ques,
          gradeAmount: gradeAmount,
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const changeQuestionOptionsArr = (
    optionsArr: iRegularOption[]
  ): iQuestion[] => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Multiple") {
        return {
          ...ques,
          optionsArr: optionsArr,
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const changeQuestionCorrectOptionsId = (
    currentOptionId: number,
    isCurrentOptionOn: boolean
  ) => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Multiple") {
        return {
          ...ques,
          correctOptionsId:
            ques.correctOptionsId == undefined
              ? [currentOptionId]
              : isCurrentOptionOn
              ? ques.correctOptionsId.filter((id) => id !== currentOptionId)
              : [...ques.correctOptionsId, currentOptionId],
          optionsArr: ques.optionsArr.map((op) => {
            if (op.id == currentOptionId) {
              return {
                ...op,
                isCorrect: !op.isCorrect,
              };
            } else {
              return op;
            }
          }),
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const changeHardMode = (): iQuestion[] => {
    const newQuesArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Multiple") {
        return {
          ...ques,
          isHardModeOn: !ques.isHardModeOn,
        };
      } else {
        return ques;
      }
    });
    return newQuesArr;
  };

  const AddQuestionOptionsArr = (option: iRegularOption) => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Multiple") {
        return {
          ...ques,
          optionsArr: [...ques.optionsArr, option],
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const DeleteQuestionOptionsArr = (optionId: number) => {
    let isChosenOption: boolean = false;
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Multiple") {
        const newArr = ques.optionsArr.filter((op) => {
          if (op.id == optionId && op.isCorrect) {
            isChosenOption = true;
          }
          return op.id !== optionId;
        });

        return {
          ...ques,
          correctOptionsId: isChosenOption
            ? ques.correctOptionsId?.filter((opId) => opId !== optionId)
            : ques.correctOptionsId,
          optionsArr: newArr,
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const getQuest = (): iMultipleQuestion | undefined => {
    const ques = props.testQuestions.find(({ id }) => id == props.id);

    return ques?.type == "Multiple" ? ques : undefined;
  };

  const [optionText, setOptionText] = useState<string>("");
  const [isHardMode, setIsHardMode] = useState<boolean>(false);

  return (
    <div>
      <div>=</div>
      <div>
        <h1>Multiple question Setting</h1>
        <div>x</div>
        <form>
          <input
            type="text"
            placeholder="Question input..."
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              props.testQuestionsChangeFunc(
                changeQuestionTextInput(e.currentTarget.value)
              );
            }}
          />
          <img src={getQuest()?.imgURL!} width="100px" alt="" />
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                props.testQuestionsChangeFunc(
                  changeQuestionImgURL(URL.createObjectURL(file))
                );
              }
            }}
          />
          <Switcher
            info="Hard mode"
            switchValue={isHardMode}
            switchFunc={() => {
              setIsHardMode(!isHardMode);
              props.testQuestionsChangeFunc(changeHardMode());
            }}
          />
          <input
            type="number"
            min={0.1}
            placeholder="Grade amount input..."
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              props.testQuestionsChangeFunc(
                changeQuestionGradeAmount(Number(e.currentTarget.value))
              );
            }}
          />
        </form>
        <div>
          <form>
            {getQuest()?.optionsArr.map((opt) => (
              <div key={opt.id}>
                <div>
                  <input
                    type="text"
                    value={opt.answer}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                      const newArr: iRegularOption[] | undefined =
                        getQuest()?.optionsArr.map((op) => {
                          if (op.id == opt.id) {
                            return { ...op, answer: e.currentTarget.value };
                          } else {
                            return op;
                          }
                        });
                      if (newArr !== undefined) {
                        props.testQuestionsChangeFunc(
                          changeQuestionOptionsArr(newArr)
                        );
                      }
                    }}
                  />
                  <input
                    type="checkbox"
                    name={`${props.id}_multiple`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newArr: iRegularOption[] | undefined =
                        getQuest()?.optionsArr.map((op) => {
                          if (op.id == opt.id) {
                            return { ...op, isCorrect: true };
                          } else {
                            return op;
                          }
                        });

                      if (newArr !== undefined) {
                        props.testQuestionsChangeFunc(
                          changeQuestionCorrectOptionsId(opt.id, opt.isCorrect)
                        );
                      }
                    }}
                  />
                </div>
                <div
                  onClick={(e: MouseEvent<HTMLDivElement>) => {
                    props.testQuestionsChangeFunc(
                      DeleteQuestionOptionsArr(opt.id)
                    );
                  }}
                >
                  x
                </div>
              </div>
            ))}
          </form>
        </div>
        {getQuest()?.optionsArr.length! < 12 ? (
          <div>
            <input
              type="text"
              placeholder="Option text..."
              value={optionText}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setOptionText(e.currentTarget.value);
              }}
            />
            <div
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                props.testQuestionsChangeFunc(
                  AddQuestionOptionsArr({
                    id: Date.now(),
                    answer: optionText,
                    isCorrect: false,
                  })
                );
                setOptionText("");
              }}
            >
              +
            </div>
          </div>
        ) : null}
        <div>{getQuest()?.optionsArr.length}/12</div>
      </div>
    </div>
  );
};
