import React, { MouseEvent, ChangeEvent, useState } from "react";
import { iMatchPair, iMatchQuestion, iQuestion } from "../types";
import { Switcher } from "./Switcher";
import { InfoCircle } from "./InfoCircle";

export const MatchQuestionSetting: React.FC<{
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

  const changeQuestionPairArr = (newPairs: iMatchPair[]): iQuestion[] => {
    const newQuesArr: iQuestion[] = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Match") {
        return {
          ...ques,
          pairs: newPairs,
        };
      } else {
        return ques;
      }
    });
    return newQuesArr;
  };

  const changeHardMode = (): iQuestion[] => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Match") {
        return {
          ...ques,
          isHardModeOn: !ques.isHardModeOn,
        };
      } else {
        return ques;
      }
    });

    return newQuestArr;
  };

  const addQuestionPair = (pair: iMatchPair): iQuestion[] => {
    const newQuesArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Match") {
        return {
          ...ques,
          pairs: [...ques.pairs, { ...pair, index: ques.pairs.length }],
        };
      } else {
        return ques;
      }
    });
    return newQuesArr;
  };

  const deleteQuestionPair = (pairId: number): iQuestion[] => {
    const newQuesArr: iQuestion[] = props.testQuestions.map((ques) => {
      if (ques.id == props.id && ques.type == "Match") {
        return {
          ...ques,
          pairs: ques.pairs.filter(({ id }) => id !== pairId),
        };
      } else {
        return ques;
      }
    });
    return newQuesArr;
  };

  const getQuest = (): iMatchQuestion | undefined => {
    const ques = props.testQuestions.find(({ id }) => id == props.id);

    return ques?.type == "Match" ? ques : undefined;
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

  const pairDrag = (
    e: React.DragEvent<HTMLSpanElement>,
    fromId: number,
    type: "pair"
  ) => {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ fromId, type })
    );
  };

  const pairSwitch = (
    e: React.DragEvent<HTMLSpanElement>,
    toId: number
  ): iQuestion[] => {
    const fromPair: { fromId: number; type: "pair" } = JSON.parse(
      e.dataTransfer.getData("application/json")
    );

    if (fromPair.type == "pair") {
      const newArr = (arr: iMatchPair[]): iMatchPair[] => {
        const fromIndex = arr.findIndex((opt) => opt.id == fromPair.fromId);
        const toIndex = arr.findIndex((opt) => opt.id == toId);
        const [fromOpt] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, fromOpt);
        return arr;
      };

      const updatedArr: iQuestion[] = props.testQuestions.map((ques) => {
        if (ques.id == props.id && ques.type == "Match") {
          return {
            ...ques,
            pairs: newArr(ques.pairs),
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

  const [isHardMode, setIsHardMode] = useState<boolean>(false);
  const [isInfoShowed, setIsInfoShowed] = useState<boolean>(false);

  const [optionValue, setOptionValue] = useState<string>("");
  const [answerValue, setAnswerValue] = useState<string>("");

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
          <h1>Match question Setting</h1>
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
            {getQuest()?.pairs.map((pair) => (
              <div key={pair.id} className="optionComp">
                <div
                  className="dragOption"
                  draggable
                  onDragStart={(e) => pairDrag(e, pair.id, "pair")}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) =>
                    props.testQuestionsChangeFunc(pairSwitch(e, pair.id))
                  }
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
                <div className="optionPair">
                  <input
                    className="inputOption"
                    placeholder="Option text..."
                    type="text"
                    value={pair.option}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                      const newPairArr: iMatchPair[] | undefined =
                        getQuest()?.pairs.map((p) => {
                          if (p.id == pair.id) {
                            return { ...p, option: e.currentTarget.value };
                          } else {
                            return p;
                          }
                        });
                      if (newPairArr !== undefined) {
                        props.testQuestionsChangeFunc(
                          changeQuestionPairArr(newPairArr)
                        );
                      }
                    }}
                  />
                  <input
                    className="optionEmpty"
                    placeholder="-------"
                    disabled
                  />
                  <input
                    className="inputOption"
                    placeholder="Answer text..."
                    type="text"
                    value={pair.answer}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                      const newPairArr: iMatchPair[] | undefined =
                        getQuest()?.pairs.map((p) => {
                          if (p.id == pair.id) {
                            return { ...p, answer: e.currentTarget.value };
                          } else {
                            return p;
                          }
                        });
                      if (newPairArr !== undefined) {
                        props.testQuestionsChangeFunc(
                          changeQuestionPairArr(newPairArr)
                        );
                      }
                    }}
                  />
                </div>
                <div
                  className="deleteOpt"
                  onClick={(e: MouseEvent<HTMLDivElement>) => {
                    props.testQuestionsChangeFunc(deleteQuestionPair(pair.id));
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
          {getQuest()?.pairs.length! < 10 ? (
            <form className="createMatchOptComp">
              <input
                className="matchInput"
                type="text"
                placeholder="Option input..."
                value={optionValue}
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                  setOptionValue(e.currentTarget.value);
                }}
              />
              <input
                className="matchInput"
                type="text"
                placeholder="Answer input..."
                value={answerValue}
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                  setAnswerValue(e.currentTarget.value);
                }}
              />
              <div
                className="createOptBtn"
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                  props.testQuestionsChangeFunc(
                    addQuestionPair({
                      id: Date.now(),
                      option: optionValue,
                      answer: answerValue,
                      userAnswer: "---",
                    })
                  );
                  setOptionValue("");
                  setAnswerValue("");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path
                    fill="#d9d9d9"
                    d="M10 0c.423 0 .766.343.766.766v8.467h8.468a.766.766 0 1 1 0 1.533h-8.468v8.468a.766.766 0 1 1-1.532 0l-.001-8.468H.766a.766.766 0 0 1 0-1.532l8.467-.001V.766A.768.768 0 0 1 10 0Z"
                  />
                </svg>
              </div>
            </form>
          ) : null}
          <div className="optionsCount">{getQuest()?.pairs.length} / 10</div>
        </div>
      </div>
    </div>
  );
};
