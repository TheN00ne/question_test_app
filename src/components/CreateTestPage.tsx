import React, { MouseEvent, ChangeEvent, useState, useEffect } from "react";
import { iQuestion, iRegularOption, iSimpleQuestion } from "../types";
import { Switcher } from "./Switcher";
import { Header } from "./Header";
import { SimpleQuestionSetting } from "./SimpleQuestionSetting";
import { MultipleQuestionSetting } from "./MultipleQuestionSetting";
import { MatchQuestionSetting } from "./MatchQuestionSetting";
import { WrittenQuestionSetting } from "./WrittenQuestionSetting";

export const CreateTestPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [questionsArr, setQuestionsArr] = useState<iQuestion[]>([]);
  const [currentQuestionType, setCurrentQuestionType] = useState<
    "Simple" | "Multiple" | "Match" | "Written"
  >("Simple");
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const [timerValue, setTimerValue] = useState<number | undefined>(undefined);
  const [hiddenQuestions, setHiddenQuestions] = useState<boolean>(false);
  const [hiddenCorrectAnswers, setHiddenCorrectAnswers] =
    useState<boolean>(false);

  const addQuestion = (
    type: "Simple" | "Multiple" | "Match" | "Written"
  ): iQuestion[] => {
    return [
      ...questionsArr,
      type == "Simple"
        ? {
            id: Date.now(),
            type: type,
            imgURL: "",
            question: "",
            optionsArr: [],
            gradeAmount: 0,
            correctOptionId: undefined,
          }
        : type == "Multiple"
        ? {
            id: Date.now(),
            type: type,
            imgURL: "",
            question: "",
            optionsArr: [],
            gradeAmount: 0,
            correctOptionsId: [],
            isHardModeOn: false,
          }
        : type == "Match"
        ? {
            id: Date.now(),
            type: type,
            imgURL: "",
            question: "",
            pairs: [],
            gradeAmount: 0,
            isHardModeOn: false,
          }
        : {
            id: Date.now(),
            type: type,
            imgURL: "",
            question: "",
            gradeAmount: 0,
            correctAnswer: "",
          },
    ];
  };

  const changeTimerType = (value: number) => {
    if (isTimer) {
      setTimerValue(value);
    } else {
      setTimerValue(undefined);
    }
  };

  useEffect(() => {
    changeTimerType(60);
  }, [isTimer]);

  return (
    <div>
      <Header headerText="Create Test" />
      <main>
        <form>
          <input
            type="text"
            value={title}
            placeholder="Title..."
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <textarea
            placeholder="Description..."
            value={description}
            onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.currentTarget.value);
            }}
          ></textarea>
        </form>
        <div>
          <div>
            <Switcher
              info="Timer: "
              switchValue={isTimer}
              switchFunc={setIsTimer}
            />
            {isTimer ? (
              <input
                type="number"
                min="60"
                value={timerValue}
                placeholder="Timer amount..."
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                  changeTimerType(Number(e.currentTarget.value));
                }}
              />
            ) : null}
          </div>
          <Switcher
            info="Hidden questions: "
            switchValue={hiddenQuestions}
            switchFunc={setHiddenQuestions}
          />
          <Switcher
            info="Hidden correct answers: "
            switchValue={hiddenCorrectAnswers}
            switchFunc={setHiddenCorrectAnswers}
          />
        </div>
        <div>
          {questionsArr.map((question) =>
            question.type == "Simple" ? (
              <SimpleQuestionSetting
                key={question.id}
                id={question.id}
                testQuestions={questionsArr}
                testQuestionsChangeFunc={setQuestionsArr}
              />
            ) : question.type == "Multiple" ? (
              <MultipleQuestionSetting
                key={question.id}
                id={question.id}
                testQuestions={questionsArr}
                testQuestionsChangeFunc={setQuestionsArr}
              />
            ) : question.type == "Match" ? (
              <MatchQuestionSetting
                key={question.id}
                id={question.id}
                testQuestions={questionsArr}
                testQuestionsChangeFunc={setQuestionsArr}
              />
            ) : question.type == "Written" ? (
              <WrittenQuestionSetting
                key={question.id}
                id={question.id}
                testQuestions={questionsArr}
                testQuestionsChangeFunc={setQuestionsArr}
              />
            ) : null
          )}
        </div>
      </main>

      <footer>
        <div>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              setCurrentQuestionType("Simple");
            }}
          >
            S
          </div>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              setCurrentQuestionType("Multiple");
            }}
          >
            Mu
          </div>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              setCurrentQuestionType("Match");
            }}
          >
            Ma
          </div>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              setCurrentQuestionType("Written");
            }}
          >
            W
          </div>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              setQuestionsArr(addQuestion(currentQuestionType));
            }}
          >
            +
          </div>
        </div>
        <div>Create test</div>
      </footer>
    </div>
  );
};
