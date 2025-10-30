import React, { ChangeEvent, MouseEvent, useState } from "react";
import { iRegularOption, iQuestion, iSimpleQuestion } from "../types";

export const SimpleQuestionSetting: React.FC<{
  id: number;
  testQuestions: iQuestion[];
  testQuestionsChangeFunc: (value: iQuestion[]) => void;
}> = (props) => {
  const changeQuestionTextInput = (text: string) => {
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

  const changeQuestionImgURL = (imgURL: string) => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type) {
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

  const changeQuestionGradeAmount = (gradeAmount: number) => {
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

  const changeQuestionOptionsArr = (optionsArr: iRegularOption[]) => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Simple") {
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

  const changeQuestionCorrectOptionId = (
    correctOptionId: number | undefined
  ) => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Simple") {
        console.log(correctOptionId);
        return {
          ...ques,
          correctOptionId: correctOptionId,
          optionsArr: ques.optionsArr.map((op) => {
            if (op.id == correctOptionId) {
              return {
                ...op,
                isCorrect: true,
              };
            } else {
              return {
                ...op,
                isCorrect: false,
              };
            }
          }),
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const AddQuestionOptionsArr = (option: iRegularOption) => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Simple") {
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
      if (ques.id == props.id && ques.type == "Simple") {
        const newArr = ques.optionsArr.filter((op) => {
          if (op.id == optionId && op.isCorrect) {
            isChosenOption = true;
          }
          return op.id !== optionId;
        });

        return {
          ...ques,
          correctOptionId: isChosenOption ? undefined : ques.correctOptionId,
          optionsArr: newArr,
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const getQuest = (): iSimpleQuestion | undefined => {
    const ques = props.testQuestions.find(({ id }) => id == props.id);

    return ques?.type == "Simple" ? ques : undefined;
  };

  const [optionText, setOptionText] = useState<string>("");

  return (
    <div>
      <div>=</div>
      <div>
        <h1>Simple question Setting</h1>
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
                    type="radio"
                    name={`${props.id}_simple`}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const newArr: iRegularOption[] | undefined =
                        getQuest()?.optionsArr.map((op) => {
                          if (op.id == opt.id) {
                            return { ...op, isCorrect: true };
                          } else {
                            return { ...op, isCorrect: false };
                          }
                        });

                      if (newArr !== undefined) {
                        props.testQuestionsChangeFunc(
                          changeQuestionCorrectOptionId(opt.id)
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
        {getQuest()?.optionsArr.length! < 8 ? (
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
        <div>{getQuest()?.optionsArr.length}/8</div>
      </div>
    </div>
  );
};
