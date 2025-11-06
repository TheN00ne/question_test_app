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
    const fromIdOption: { fromId: number; type: "option" } = JSON.parse(
      e.dataTransfer.getData("application/json")
    );

    if (fromIdOption.type == "option") {
      const newArr = (arr: iRegularOption[]): iRegularOption[] => {
        const fromIndex = arr.findIndex((opt) => opt.id == fromIdOption.fromId);
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

  const getQuest = (): iMultipleQuestion | undefined => {
    const ques = props.testQuestions.find(({ id }) => id == props.id);

    return ques?.type == "Multiple" ? ques : undefined;
  };

  const [optionText, setOptionText] = useState<string>("");
  const [isHardMode, setIsHardMode] = useState<boolean>(false);

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
        <h1>Multiple question Setting</h1>
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
