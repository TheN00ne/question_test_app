import React, { ChangeEvent } from "react";
import { iMatchPair, iQuestion, iWrittenQuestion } from "../types";

export const WrittenQuestionSetting: React.FC<{
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

  const changeQuestionAnswer = (correctAnswer: string) => {
    const newQuestArr = props.testQuestions.map((ques) => {
      if (ques.id == props.id) {
        return {
          ...ques,
          correctAnswer: correctAnswer,
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

  const getQuest = (): iWrittenQuestion | undefined => {
    const ques = props.testQuestions.find(({ id }) => id == props.id);

    return ques?.type == "Written" ? ques : undefined;
  };

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
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="#d9d9d9"
            d="M4 9a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2z"
          />
        </svg>
      </div>
      <div className="questionComp">
        <div className="questionHeader">
          <h1>Written question Setting</h1>
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
        <div className="answerComp">
          <div className="answerTitle">Answer: </div>
          <input
            className="answerInput"
            placeholder="Answer..."
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              props.testQuestionsChangeFunc(
                changeQuestionAnswer(e.currentTarget.value.toLowerCase().trim())
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
