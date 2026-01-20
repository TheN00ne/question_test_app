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
          width="50px"
          height="50px"
          viewBox="0 0 50 50"
        >
          <path
            fill="#d9d9d9"
            d="M4 9a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2z"
          />
        </svg>
      </div>
      <div className="questionComp">
        <div className="questionHeader">
          <h1>Simple question Setting</h1>
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
            <img src={getQuest()?.imgURL!} alt="" />
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
          <input
            className="gradeInput"
            type="number"
            min={1}
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
                    className="radInp"
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
                  className="deleteOpt"
                  onClick={(e: MouseEvent<HTMLDivElement>) => {
                    props.testQuestionsChangeFunc(
                      deleteQuestionOptionsArr(opt.id)
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

          <div>
            {getQuest()?.optionsArr.length! < 8 ? (
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
                      addQuestionOptionsArr({
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
            <div className="optionsCount">
              {getQuest()?.optionsArr.length}/8
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
