import React from "react";
import { iMatchQuestion, iQuestion, iTest } from "../types";

export const MatchQuestion: React.FC<
  iMatchQuestion & {
    isActive: boolean;
    currentTest: iTest;
    setCurrentTest(value: iTest): void;
  }
> = (props) => {
  const dragBlock = (
    e: React.DragEvent<HTMLDivElement>,
    quesId: number,
    fromPairId: number,
    fromField: "answer" | "userAnswer",
    value: string,
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
    e: React.DragEvent<HTMLDivElement>,
    toPair: {
      quesId: number;
      toPairId: number;
      toField: "answer" | "userAnswer";
      value: string;
    },
  ): iTest => {
    const fromPair: {
      quesId: number;
      fromPairId: number;
      fromField: "answer" | "userAnswer";
      value: string;
    } = JSON.parse(e.dataTransfer.getData("application/json"));
    const newQuesArr: iQuestion[] = props.currentTest.questionArr.map(
      (ques) => {
        if (
          toPair.quesId == fromPair.quesId &&
          ques.id == props.id &&
          ques.type == "Match"
        ) {
          return {
            ...ques,
            pairs: ques.pairs.map((pair) => {
              //Якщо там, де вставляємо не порожньо або те, що вставляємо порожнє, то нічого не змінюємо
              if (toPair.value != "---" || fromPair.value == "---") return pair;

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
                return { ...pair, [fromPair.fromField]: "---" };

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
      },
    );
    return { ...props.currentTest, questionArr: newQuesArr };
  };

  return (
    <div className="quesComp">
      <div className="quesHeader">
        <h2>{props.question}</h2>
        <div className="grade">Mark: {props.gradeAmount}</div>
      </div>
      <div className="imgBlock">
        <img
          src={`${props.imgURL}`}
          alt={`${props.id} multiple question image`}
        />
      </div>
      <div className="pairsComp">
        <div className="matchOptBlock">
          {props.pairs.map((pair) => (
            <div className="matchOpt">{pair.option}</div>
          ))}
        </div>
        <div className="userAnsBlock">
          {props.pairs.map((pair) => (
            <div
              className="userAns"
              draggable={props.isActive && pair.userAnswer !== "---"}
              onDragStart={(e) => {
                dragBlock(e, props.id, pair.id, "userAnswer", pair.userAnswer);
              }}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
              }}
              onDrop={(e) =>
                props.setCurrentTest(
                  switchQuestionsPairArr(e, {
                    quesId: props.id,
                    toPairId: pair.id,
                    toField: "userAnswer",
                    value: pair.userAnswer,
                  }),
                )
              }
            >
              {pair.userAnswer}
            </div>
          ))}
        </div>
        <div className="matchAnsBlock">
          {props.pairs.map((pair) => (
            <div
              className="matchAns"
              draggable={props.isActive && pair.answer !== "---"}
              onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                dragBlock(e, props.id, pair.id, "answer", pair.answer);
              }}
              onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
              }}
              onDrop={(e) =>
                props.setCurrentTest(
                  switchQuestionsPairArr(e, {
                    quesId: props.id,
                    toPairId: pair.id,
                    toField: "answer",
                    value: pair.answer,
                  }),
                )
              }
            >
              {pair.answer}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
