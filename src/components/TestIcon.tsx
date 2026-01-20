import React, { useEffect, useState } from "react";
import { iTest } from "../types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTest } from "../reducers/taskReducer";

const TestIcon: React.FC<iTest> = (props) => {
  const dispatch = useDispatch();

  const [secondsAmount, setSecondsAmount] = useState<number | undefined>(
    undefined
  );
  const [minutesAmount, setMinutesAmount] = useState<number | undefined>(
    undefined
  );
  const [hoursAmount, setHoursAmount] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (props.isSetTimer) {
      let timeLeft: number = props.timeout!;
      let hoursAmount: number = 0;
      let minutesAmount: number = 0;
      while (timeLeft > 3600) {
        timeLeft -= 3600;
        hoursAmount += 1;
      }
      while (timeLeft > 60 && timeLeft < 3600) {
        timeLeft -= 60;
        minutesAmount += 1;
      }
      setHoursAmount(hoursAmount);
      setMinutesAmount(minutesAmount);
      setSecondsAmount(timeLeft);
    }
  }, []);

  return (
    <div className={"testIcon"}>
      <div className="headerBlock">
        <div>
          {props.isSetTimer ? (
            <div className={"timerBlock"}>
              <span>{hoursAmount! > 9 ? hoursAmount : `0${hoursAmount}`}</span>:
              <span>
                {minutesAmount! > 9 ? minutesAmount : `0${minutesAmount}`}
              </span>
              :
              <span>
                {secondsAmount! > 9 ? secondsAmount : `0${secondsAmount}`}
              </span>
            </div>
          ) : null}
        </div>
        <h2 title={props.title} className={"title"}>
          {props.title}
        </h2>
        <div
          className={"deleteBtn"}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            dispatch(deleteTest(props.id));
          }}
        >
          <svg
            className={"deleteIcon"}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fill="#d9d9d9"
              d="m3.219 2.154l6.778 6.773l6.706-6.705c.457-.407.93-.164 1.119.04a.777.777 0 0 1-.044 1.035l-6.707 6.704l6.707 6.702c.298.25.298.74.059 1.014c-.24.273-.68.431-1.095.107l-6.745-6.749l-6.753 6.752c-.296.265-.784.211-1.025-.052c-.242-.264-.334-.72-.025-1.042l6.729-6.732l-6.701-6.704c-.245-.27-.33-.764 0-1.075c.33-.311.822-.268.997-.068Z"
            />
          </svg>
        </div>
      </div>
      <div className="bodyBlock">
        <img className={"testImg"} src={props.imgURL ? props.imgURL : ""} />
        <p className={"testDescription"}>{props.description}</p>
      </div>
      <div className="footerBlock">
        <div>
          <div className={"amountInfo"}>
            Question amount: {props.questionArr.length}
          </div>
          <div className={"amountInfo"}>Mark amount: {props.totalMark}</div>
        </div>
        <Link className={"openTestBtn"} to={`/testView/${props.id}`}>
          Open
        </Link>
      </div>
    </div>
  );
};

export default TestIcon;
