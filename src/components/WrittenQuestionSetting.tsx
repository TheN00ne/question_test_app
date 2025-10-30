import React, { ChangeEvent } from "react";
import { iQuestion, iWrittenQuestion } from "../types";

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

  const getQuest = (): iWrittenQuestion | undefined => {
    const ques = props.testQuestions.find(({ id }) => id == props.id);

    return ques?.type == "Written" ? ques : undefined;
  };

  return (
    <div>
      <h1>Written question Setting</h1>
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
        <span>Answer: </span>
        <input
          type="text"
          placeholder="Answer..."
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            props.testQuestionsChangeFunc(
              changeQuestionAnswer(e.currentTarget.value)
            );
          }}
        />
      </div>
    </div>
  );
};
