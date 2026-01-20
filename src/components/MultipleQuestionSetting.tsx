import React, { ChangeEvent, MouseEvent, useState } from "react";
import {
  iRegularOption,
  iQuestion,
  iSimpleQuestion,
  iMultipleQuestion,
} from "../types";
import { Switcher } from "./Switcher";
import { InfoCircle } from "./InfoCircle";

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
        if (ques.id == props.id && ques.type == "Multiple") {
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
  const [isInfoShowed, setIsInfoShowed] = useState<boolean>(false);

  return (
    <div className="questionBlock">
      <div
        className="dragIcon"
        draggable
        onDragStart={(e) => questionDrag(e, props.id, "question")}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) =>
          props.testQuestionsChangeFunc(questionsSwitch(e, props.id))
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <path
            fill="#d9d9d9"
            d="M4 9a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2z"
          />
        </svg>
      </div>
      <div className="questionComp">
        <div className="questionHeader">
          <h1>Multiple question Setting</h1>
          <div
            className="deleteQues"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              props.testQuestionsChangeFunc(
                props.testQuestions.filter(({ id }) => id !== props.id)
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width="10px"
              height="10px"
            >
              <path
                fill="#d9d9d9"
                d="m3.219 2.154l6.778 6.773l6.706-6.705c.457-.407.93-.164 1.119.04a.777.777 0 0 1-.044 1.035l-6.707 6.704l6.707 6.702c.298.25.298.74.059 1.014c-.24.273-.68.431-1.095.107l-6.745-6.749l-6.753 6.752c-.296.265-.784.211-1.025-.052c-.242-.264-.334-.72-.025-1.042l6.729-6.732l-6.701-6.704c-.245-.27-.33-.764 0-1.075c.33-.311.822-.268.997-.068Z"
              />
            </svg>
          </div>
        </div>
        <form className="quesInfoForm">
          <input
            className="quesTitle"
            type="text"
            placeholder="Question input..."
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              props.testQuestionsChangeFunc(
                changeQuestionTextInput(e.currentTarget.value)
              );
            }}
          />
          <div className="imgBlock">
            <img src={getQuest()?.imgURL!} width="100px" alt="" />
            <input
              className="imgInput"
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
          </div>
          <div className="hardModeContainer">
            <InfoCircle
              isInfoShowed={isInfoShowed}
              setIsInfoShowed={setIsInfoShowed}
              info="When the hard mode is enabled, a grade will only be given when all answers are correct"
            />
            <Switcher
              info="Hard mode"
              switchValue={isHardMode}
              switchFunc={() => {
                setIsHardMode(!isHardMode);
                props.testQuestionsChangeFunc(changeHardMode());
              }}
            />
          </div>
          <input
            className="gradeInput"
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
        <form className="optionsForm">
          <div className="optionsComp">
            {getQuest()?.optionsArr.map((opt) => (
              <div key={opt.id} className="optionComp">
                <div
                  className="dragOption"
                  draggable
                  onDragStart={(e) => optionDrag(e, opt.id, "option")}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    props.testQuestionsChangeFunc(optionsSwitch(e, opt.id));
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#1e1e1e"
                      d="M4 9a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2z"
                    />
                  </svg>
                </div>
                <div className="option">
                  <input
                    className="textInp"
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
                    className="checkInp"
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
                  className="deleteOpt"
                  onClick={(e: MouseEvent<HTMLDivElement>) => {
                    props.testQuestionsChangeFunc(
                      DeleteQuestionOptionsArr(opt.id)
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="15px"
                    height="15px"
                  >
                    <path
                      fill="#d9d9d9"
                      d="m3.219 2.154l6.778 6.773l6.706-6.705c.457-.407.93-.164 1.119.04a.777.777 0 0 1-.044 1.035l-6.707 6.704l6.707 6.702c.298.25.298.74.059 1.014c-.24.273-.68.431-1.095.107l-6.745-6.749l-6.753 6.752c-.296.265-.784.211-1.025-.052c-.242-.264-.334-.72-.025-1.042l6.729-6.732l-6.701-6.704c-.245-.27-.33-.764 0-1.075c.33-.311.822-.268.997-.068Z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </form>
        <div>
          {getQuest()?.optionsArr.length! < 12 ? (
            <div className="createOptComp">
              <input
                className="createOptInp"
                type="text"
                placeholder="Option text..."
                value={optionText}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setOptionText(e.currentTarget.value);
                }}
              />
              <div
                className="createOptBtn"
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    fill="#d9d9d9"
                    d="M10 0c.423 0 .766.343.766.766v8.467h8.468a.766.766 0 1 1 0 1.533h-8.468v8.468a.766.766 0 1 1-1.532 0l-.001-8.468H.766a.766.766 0 0 1 0-1.532l8.467-.001V.766A.768.768 0 0 1 10 0Z"
                  />
                </svg>
              </div>
            </div>
          ) : null}
          <div className="optionsCount">{getQuest()?.optionsArr.length}/12</div>
        </div>
      </div>
    </div>
  );
};
