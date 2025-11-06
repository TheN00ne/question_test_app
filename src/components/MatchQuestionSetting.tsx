import React, { MouseEvent, ChangeEvent, useState } from "react";
import { iMatchPair, iMatchQuestion, iQuestion } from "../types";
import { Switcher } from "./Switcher";

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

  const onDrag = (
    e: React.DragEvent<HTMLInputElement>,
    quesId: number,
    fromPairId: number,
    fromField: "answer" | "userAnswer",
    value: string
  ) => {
    const dragData = JSON.stringify({
      quesId,
      fromPairId,
      fromField,
      value,
    });
    e.dataTransfer.setData("application/json", dragData);
  };

  const switchQuestionsPairArr = (
    e: React.DragEvent<HTMLInputElement>,
    toPair: {
      quesId: number;
      toPairId: number;
      toField: "answer" | "userAnswer";
      value: string;
    }
  ): iQuestion[] => {
    const fromPair: {
      quesId: number;
      fromPairId: number;
      fromField: "answer" | "userAnswer";
      value: string;
    } = JSON.parse(e.dataTransfer.getData("application/json"));
    const newQuesArr: iQuestion[] = props.testQuestions.map((ques) => {
      if (
        toPair.quesId == fromPair.quesId &&
        ques.id == props.id &&
        ques.type == "Match"
      ) {
        return {
          ...ques,
          pairs: ques.pairs.map((pair) => {
            //Якщо там, де вставляємо не порожньо або те, що вставляємо порожнє, то нічого не змінюємо
            if (toPair.value != "" || fromPair.value == "") return pair;

            //Якщо answer і userAnswer - це одна пара, то міняємо місцями
            if (
              fromPair.fromPairId == toPair.toPairId &&
              toPair.toPairId == pair.id
            )
              return {
                ...pair,
                userAnswer: pair.answer,
                answer: pair.userAnswer,
              };

            //Якщо у пари id такий самий, як у пари, з якої брали drag, то очищаємо в неї fromField (бо ми його перенесли з выдси)
            if (pair.id == fromPair.fromPairId)
              return { ...pair, [fromPair.fromField]: "" };

            //Якщо у пари id такий самий, як у пари, в яку переносимо drag, то встановлюємо їй fromField значення drag(бо ми його перенесли сюди)
            if (pair.id == toPair.toPairId)
              return { ...pair, [toPair.toField]: fromPair.value };

            //Інакше - нічого не міняємо
            return pair;
          }),
        };
      } else {
        return ques;
      }
    });
    return newQuesArr;
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

  const [optionValue, setOptionValue] = useState<string>("");
  const [answerValue, setAnswerValue] = useState<string>("");

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
        <h1>Match question Setting</h1>
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
        <form>
          {getQuest()?.pairs.map((pair) => (
            <div key={pair.id}>
              <span
                draggable
                onDragStart={(e) => pairDrag(e, pair.id, "pair")}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={(e) =>
                  props.testQuestionsChangeFunc(pairSwitch(e, pair.id))
                }
              >
                =
              </span>
              <div>
                <div
                  onClick={(e: MouseEvent<HTMLDivElement>) => {
                    props.testQuestionsChangeFunc(deleteQuestionPair(pair.id));
                  }}
                >
                  x
                </div>
                <input
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
                  style={{
                    border: "black solid 1px",
                    width: "100px",
                    height: "100px",
                  }}
                />
                <input
                  type="text"
                  value={pair.userAnswer}
                  draggable
                  onDragStart={(e) =>
                    onDrag(e, props.id, pair.id, "userAnswer", pair.userAnswer)
                  }
                  onDragOver={(e: React.DragEvent<HTMLInputElement>) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) =>
                    props.testQuestionsChangeFunc(
                      switchQuestionsPairArr(e, {
                        quesId: props.id,
                        toPairId: pair.id,
                        toField: "userAnswer",
                        value: pair.userAnswer,
                      })
                    )
                  }
                  style={{
                    border: "black dashed 1px",
                    width: "100px",
                    height: "100px",
                  }}
                />
                <input
                  type="text"
                  value={pair.answer}
                  draggable
                  onDragStart={(e) =>
                    onDrag(e, props.id, pair.id, "answer", pair.answer)
                  }
                  onDragOver={(e: React.DragEvent<HTMLInputElement>) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) =>
                    props.testQuestionsChangeFunc(
                      switchQuestionsPairArr(e, {
                        quesId: props.id,
                        toPairId: pair.id,
                        toField: "answer",
                        value: pair.answer,
                      })
                    )
                  }
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
                  style={{
                    border: "black solid 1px",
                    width: "100px",
                    height: "100px",
                  }}
                />
              </div>
            </div>
          ))}
        </form>
        <div>{getQuest()?.pairs.length} / 10</div>

        {getQuest()?.pairs.length! < 10 ? (
          <form>
            <input
              type="text"
              placeholder="Option input..."
              value={optionValue}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setOptionValue(e.currentTarget.value);
              }}
            />
            <input
              type="text"
              placeholder="Answer input..."
              value={answerValue}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                setAnswerValue(e.currentTarget.value);
              }}
            />
            <div
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                props.testQuestionsChangeFunc(
                  addQuestionPair({
                    id: Date.now(),
                    option: optionValue,
                    answer: answerValue,
                    userAnswer: "",
                  })
                );
                setOptionValue("");
                setAnswerValue("");
              }}
            >
              +
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};
