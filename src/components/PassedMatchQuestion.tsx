import React, { useEffect, useState } from "react";
import { iInitialState, iMatchQuestion, iTest } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "..";

export const PassedMatchedQuestion: React.FC<
  iMatchQuestion & {
    currentTest: iTest;
    isHiddenCorrectAnswers: boolean;
    setTotalMark: (value: number | ((prev: number) => number)) => void;
  }
> = (props) => {
  const { testArr }: iInitialState = useSelector((state: RootState) => state);
  const currentTest = testArr.find((test) => test.id == props.currentTest.id);

  const [currentCorrectQuestion, setCurrentCorrectQuestion] = useState<
    iMatchQuestion | undefined
  >(undefined);

  const [mark, setMark] = useState<number>(0);

  useEffect(() => {
    const matchQuests: iMatchQuestion[] | undefined =
      currentTest?.questionArr.filter((ques) => ques.type == "Match");

    const currentQues: iMatchQuestion | undefined = matchQuests?.find(
      (ques) => ques.id == props.id,
    );

    if (currentQues) {
      setCurrentCorrectQuestion(currentQues);
    }
  }, []);

  useEffect(() => {
    if (props.isHardModeOn) {
      for (let pair of props.pairs) {
        if (
          pair.userAnswer !==
          currentCorrectQuestion?.pairs.find((p) => p.id == pair.id)?.answer
        ) {
          setMark(0);
          return;
        }
      }
      setMark(props.gradeAmount);
    } else {
      for (let pair of props.pairs) {
        if (
          pair.userAnswer ==
          currentCorrectQuestion?.pairs.find((p) => p.id == pair.id)?.answer
        ) {
          setMark((prev) => prev + props.gradeAmount / props.pairs.length);
        }
      }
    }
  }, [currentCorrectQuestion]);

  useEffect(() => {
    props.setTotalMark((prev) => prev + mark);
  }, [mark]);

  return (
    <div className="quesComp">
      <div className="quesHeader">
        <h2>{props.question}</h2>
        {!props.isHiddenCorrectAnswers ? (
          <div className="grade">Mark: {Math.round(mark * 100) / 100}</div>
        ) : null}
      </div>
      <div className="imgBlock">
        <img src={`${props.imgURL}`} alt={`${props.id} match question image`} />
      </div>
      <div>
        {props?.pairs.map((pair) => (
          <div className="passedPairComp">
            <div
              className="passedOption"
              style={
                !props.isHiddenCorrectAnswers
                  ? {
                      backgroundColor: `${
                        pair.userAnswer ==
                        currentCorrectQuestion?.pairs.find(
                          (p) => p.id == pair.id,
                        )?.answer
                          ? "green"
                          : pair.userAnswer == "---"
                            ? "#7f809f"
                            : "red"
                      }`,
                    }
                  : undefined
              }
            >
              {pair.option}
            </div>
            {pair.userAnswer ==
            currentCorrectQuestion?.pairs.find((p) => p.id == pair.id)
              ?.answer ? (
              <div
                className="passedOption"
                style={
                  !props.isHiddenCorrectAnswers
                    ? {
                        backgroundColor: `${
                          pair.userAnswer ==
                          currentCorrectQuestion?.pairs.find(
                            (p) => p.id == pair.id,
                          )?.answer
                            ? "green"
                            : pair.userAnswer == "---"
                              ? "#7f809f"
                              : "red"
                        }`,
                      }
                    : undefined
                }
              >
                {pair.userAnswer}
              </div>
            ) : (
              <div
                className="passedOption"
                style={
                  !props.isHiddenCorrectAnswers
                    ? {
                        backgroundColor: `${
                          pair.userAnswer ==
                          currentCorrectQuestion?.pairs.find(
                            (p) => p.id == pair.id,
                          )?.answer
                            ? "green"
                            : pair.userAnswer == "---"
                              ? "#7f809f"
                              : "red"
                        }`,
                      }
                    : undefined
                }
              >
                {!props.isHiddenCorrectAnswers ? (
                  <div>
                    <s>{pair.userAnswer}</s>
                    <div>
                      <b>
                        {
                          currentCorrectQuestion?.pairs.find(
                            (p) => p.id == pair.id,
                          )?.answer
                        }
                      </b>
                    </div>
                  </div>
                ) : (
                  <div>{pair.userAnswer}</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
