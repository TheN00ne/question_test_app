import React, { MouseEvent, ChangeEvent, useState, useEffect } from "react";
import { iQuestion, iRegularOption, iSimpleQuestion } from "../types";
import { Switcher } from "./Switcher";
import { Header } from "./Header";
import { SimpleQuestionSetting } from "./SimpleQuestionSetting";
import { MultipleQuestionSetting } from "./MultipleQuestionSetting";
import { MatchQuestionSetting } from "./MatchQuestionSetting";
import { WrittenQuestionSetting } from "./WrittenQuestionSetting";
import { useDispatch } from "react-redux";
import { createTest } from "../reducers/taskReducer";

export const CreateTestPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [questionsArr, setQuestionsArr] = useState<iQuestion[]>([]);
  const [currentQuestionType, setCurrentQuestionType] = useState<
    "Simple" | "Multiple" | "Match" | "Written"
  >("Simple");
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const [timerValue, setTimerValue] = useState<number | undefined>(undefined);
  const [hiddenQuestions, setHiddenQuestions] = useState<boolean>(false);
  const [hiddenCorrectAnswers, setHiddenCorrectAnswers] =
    useState<boolean>(false);

  const [secondsAmount, setSecondsAmount] = useState<number>(10);
  const [minutesAmount, setMinutesAmount] = useState<number>(0);
  const [hoursAmount, setHoursAmount] = useState<number>(0);

  const [isTestValid, setIsTestValid] = useState<boolean>(false);

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

  const changeTimerType = () => {
    if (isTimer) {
      setTimerValue(hoursAmount * 3600 + minutesAmount * 60 + secondsAmount);
    } else {
      setTimerValue(undefined);
    }
  };

  const checkIsTestValid = (): boolean => {
    if (
      title.trim() == "" ||
      description.trim() == "" ||
      (isTimer && timerValue == undefined) ||
      questionsArr.length == 0
    ) {
      return false;
    } else {
      for (let ques of questionsArr) {
        if (ques.question.trim().length == 0 || ques.gradeAmount == 0) {
          return false;
        }
        if (ques.type == "Simple") {
          if (ques.optionsArr.length < 2 || ques.correctOptionId == undefined) {
            return false;
          }
          if (ques.optionsArr.length > 1) {
            for (let opt of ques.optionsArr) {
              if (opt.answer == "") {
                return false;
              }
            }
          } else {
            return false;
          }
        } else if (ques.type == "Multiple") {
          if (ques.optionsArr.length < 2 || ques.correctOptionsId.length == 0) {
            return false;
          }
        } else if (ques.type == "Match") {
          if (ques.pairs.length > 1) {
            for (let pair of ques.pairs) {
              if (pair.answer == "" || pair.option == "") {
                return false;
              }
            }
          } else {
            return false;
          }
        } else if (ques.type == "Written") {
          if (ques.correctAnswer.trim() == "") {
            return false;
          }
        }
      }
    }
    return true;
  };

  const countTotalMark = (): number => {
    let sum = 0;
    for (let ques of questionsArr) {
      sum = sum + ques.gradeAmount;
    }
    return sum;
  };

  useEffect(() => {
    setIsTestValid(checkIsTestValid());
  }, [questionsArr, title, description, image, isTimer, timerValue]);

  useEffect(() => {
    changeTimerType();
  }, [isTimer, secondsAmount, minutesAmount, hoursAmount]);

  const dispatch = useDispatch();

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
          <img src={image} width="100px" />
          <input
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.currentTarget.files?.[0];
              if (file) {
                setImage(URL.createObjectURL(file));
              }
            }}
          />
        </form>
        <div>
          <div>
            <Switcher
              info="Timer: "
              switchValue={isTimer}
              switchFunc={setIsTimer}
            />
            {isTimer ? (
              <div>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hoursAmount}
                  placeholder="Hours amount..."
                  onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    setHoursAmount(Number(e.currentTarget.value));
                  }}
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutesAmount}
                  placeholder="Minutes amount..."
                  onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    setMinutesAmount(Number(e.currentTarget.value));
                  }}
                />
                <input
                  type="number"
                  min={hoursAmount == 0 && minutesAmount == 0 ? 10 : 0}
                  max="59"
                  value={secondsAmount}
                  placeholder="Seconds amount..."
                  onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    setSecondsAmount(Number(e.currentTarget.value));
                  }}
                />
              </div>
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
        {isTestValid ? (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              dispatch(
                createTest({
                  id: Date.now(),
                  title: title,
                  description: description,
                  imgURL: image,
                  questionArr: questionsArr,
                  totalMark: countTotalMark(),
                  isSetTimer: isTimer,
                  timeout: timerValue,
                  isHiddenQuestions: hiddenQuestions,
                  isHiddenCorrectAnswers: hiddenCorrectAnswers,
                })
              );
              setTitle("");
              setDescription("");
              setImage(undefined);
              setIsTimer(false);
              setTimerValue(undefined);
              setCurrentQuestionType("Simple");
              setQuestionsArr([]);
            }}
          >
            Create test
          </div>
        ) : (
          <div>---</div>
        )}
      </footer>
    </div>
  );
};
