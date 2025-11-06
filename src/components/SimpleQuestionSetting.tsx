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
      if (ques.id == props.id && ques.type == "Simple") {
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
    const newQuestArr: iQuestion[] = props.testQuestions.map((ques) => {
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

  const addQuestionOptionsArr = (option: iRegularOption): iQuestion[] => {
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

  const deleteQuestionOptionsArr = (optionId: number) => {
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

  const questionDrag = (
    e: React.DragEvent<HTMLSpanElement>,
    fromId: number,
    type: "question"
  ) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ fromId, type })
    );
  };

  const questionsSwitch = (
    e: React.DragEvent<HTMLSpanElement>,
    toId: number
  ): iQuestion[] => {
    const fromQuestion: { fromId: number; type: "question" } = JSON.parse(
      e.dataTransfer.getData("application/json")
    );

    if (fromQuestion.type == "question") {
      const quesArr = [...props.testQuestions];
      const fromIndex = quesArr.findIndex(
        (ques) => ques.id == fromQuestion.fromId
      );
      const toIndex = quesArr.findIndex((ques) => ques.id == toId);
      const [fromOpt] = quesArr.splice(fromIndex, 1);
      quesArr.splice(toIndex, 0, fromOpt);
      return quesArr;
    } else {
      return props.testQuestions;
    }
  };

  const optionDrag = (
    e: React.DragEvent<HTMLSpanElement>,
    fromId: number,
    type: "option"
  ) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ fromId, type })
    );
  };

  const optionsSwitch = (
    e: React.DragEvent<HTMLSpanElement>,
    toId: number
  ): iQuestion[] => {
    const fromOption: { fromId: number; type: "option" } = JSON.parse(
      e.dataTransfer.getData("application/json")
    );

    if (fromOption.type == "option") {
      const newArr = (arr: iRegularOption[]): iRegularOption[] => {
        const fromIndex = arr.findIndex((opt) => opt.id == fromOption.fromId);
        const toIndex = arr.findIndex((opt) => opt.id == toId);
        const [fromOpt] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, fromOpt);
        return arr;
      };

      const updatedArr: iQuestion[] = props.testQuestions.map((ques) => {
        if (ques.id == props.id && ques.type == "Simple") {
          return {
            ...ques,
            optionsArr: newArr(ques.optionsArr),
          };
        } else {
          return ques;
        }
      });

      return updatedArr;
    } else {
      return props.testQuestions;
    }
  };

  const [optionText, setOptionText] = useState<string>("");

  return (
    <div>
      <span
        draggable
        onDragStart={(e) => questionDrag(e, props.id, "question")}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) =>
          props.testQuestionsChangeFunc(questionsSwitch(e, props.id))
        }
      >
        =
      </span>
      <div>
        <h1>Simple question Setting</h1>
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            props.testQuestionsChangeFunc(
              props.testQuestions.filter(({ id }) => id !== props.id)
            );
          }}
        >
          x
        </div>
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
                  <span
                    draggable
                    onDragStart={(e) => optionDrag(e, opt.id, "option")}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) =>
                      props.testQuestionsChangeFunc(optionsSwitch(e, opt.id))
                    }
                  >
                    =
                  </span>
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
                      deleteQuestionOptionsArr(opt.id)
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
                  addQuestionOptionsArr({
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
