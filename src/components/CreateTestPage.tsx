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
import { InfoCircle } from "./InfoCircle";

const CreateTestPage: React.FC = () => {
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

  const [isHiddenQuesShowed, setIsHiddenQuesShowed] = useState<boolean>(false);
  const [isHiddenCorrectAnswShowed, setIsHiddenCorrectAnswShowed] =
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

  useEffect(() => {
    setSecondsAmount(10);
    setMinutesAmount(0);
    setHoursAmount(0);
  }, [isTimer]);

  const dispatch = useDispatch();

  return (
    <div>
      <Header headerText="Create Test" />
      <main>
        <form className={"testForm"}>
          <input
            className={"titleInput"}
            type="text"
            value={title}
            placeholder="Title..."
            onInput={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <textarea
            className={"descriptionInput"}
            placeholder="Description..."
            value={description}
            onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.currentTarget.value);
            }}
          ></textarea>
          <div className="imageBlock">
            <img className={"testImg"} src={image} />
            <input
              className={"imgInput"}
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.currentTarget.files?.[0];
                if (file) {
                  setImage(URL.createObjectURL(file));
                }
              }}
            />
          </div>
        </form>
        <div className={"switchersMenu"}>
          <div className="switcherBlock">
            <Switcher
              info="Timer: "
              switchValue={isTimer}
              switchFunc={setIsTimer}
            />
            {isTimer ? (
              <div className="timer">
                <input
                  className="timerDisplay"
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
                  className="timerDisplay"
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
                  className="timerDisplay"
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
          <div className="switcherBlock">
            <InfoCircle
              isInfoShowed={isHiddenQuesShowed}
              setIsInfoShowed={setIsHiddenQuesShowed}
              info="When hidden questions are enabled, the user won't be able to see the test questions until the test begins"
            />
            <Switcher
              info="Hidden questions: "
              switchValue={hiddenQuestions}
              switchFunc={setHiddenQuestions}
            />
          </div>
          <div className="switcherBlock">
            <InfoCircle
              isInfoShowed={isHiddenCorrectAnswShowed}
              setIsInfoShowed={setIsHiddenCorrectAnswShowed}
              info="When hidden correct answers are enabled, the user won't be able to see the correct answers to test even after finishing the test"
            />
            <Switcher
              info="Hidden correct answers: "
              switchValue={hiddenCorrectAnswers}
              switchFunc={setHiddenCorrectAnswers}
            />
          </div>
        </div>
        <div className="questionContainer">
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
        <div className="createTestBlock">
          <div className="toolsBar">
            <div
              className={`toolOption ${
                currentQuestionType == "Simple" ? "toolOptionActive" : null
              }`}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setCurrentQuestionType("Simple");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#d9d9d9"
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"
                />
              </svg>
            </div>
            <div
              className={`toolOption ${
                currentQuestionType == "Multiple" ? "toolOptionActive" : null
              }`}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setCurrentQuestionType("Multiple");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <rect
                  width="16.5"
                  height="16.5"
                  x="3.75"
                  y="3.75"
                  fill="none"
                  stroke="#d9d9d9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  rx="4"
                />
              </svg>
            </div>
            <div
              className={`toolOption ${
                currentQuestionType == "Match" ? "toolOptionActive" : null
              }`}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setCurrentQuestionType("Match");
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" y="0" width="9" height="20" rx="1" fill="#d9d9d9" />
                <rect
                  x="16"
                  y="0"
                  width="9"
                  height="20"
                  rx="1"
                  fill="#d9d9d9"
                />
                <line
                  x1="9.5"
                  y1="11"
                  x2="16"
                  y2="11"
                  stroke="#d9d9d9"
                  stroke-width="1"
                  stroke-dasharray="2 2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div
              className={`toolOption ${
                currentQuestionType == "Written" ? "toolOptionActive" : null
              }`}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setCurrentQuestionType("Written");
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="10"
                  y="9"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  font-size="12"
                  font-weight="900"
                  fill="#d9d9d9"
                  font-family="Arial, Helvetica, sans-serif"
                >
                  W
                </text>

                <line
                  x1="3"
                  y1="15"
                  x2="17"
                  y2="15"
                  stroke="#d9d9d9"
                  stroke-width="1.5"
                  stroke-dasharray="1 2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div
              className="addOption"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setQuestionsArr(addQuestion(currentQuestionType));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                width="25"
                height="25"
              >
                <path
                  fill="#d9d9d9"
                  d="M10 0c.423 0 .766.343.766.766v8.467h8.468a.766.766 0 1 1 0 1.533h-8.468v8.468a.766.766 0 1 1-1.532 0l-.001-8.468H.766a.766.766 0 0 1 0-1.532l8.467-.001V.766A.768.768 0 0 1 10 0Z"
                />
              </svg>
            </div>
          </div>

          <div
            className={
              isTestValid ? "createOptionBtnAnab" : "createOptionBtnDisab"
            }
            onClick={
              isTestValid
                ? (e: React.MouseEvent<HTMLDivElement>) => {
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
                  }
                : () => null
            }
          >
            Create test
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default CreateTestPage;
