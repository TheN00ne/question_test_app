import React, { useEffect, useState } from "react";
import { iTest } from "../types";
import { Link } from "react-router-dom";

export const TestIcon: React.FC<iTest> = (props) => {
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
    <div>
      <div>
        {props.isSetTimer ? (
          <div>
            <span>{hoursAmount}</span>:<span>{minutesAmount}</span>:
            <span>{secondsAmount}</span>
          </div>
        ) : null}
        <div>x</div>
        <h2>{props.title}</h2>
      </div>
      <div>
        <img src={props.imgURL ? props.imgURL : ""} />
        <p>{props.description}</p>
      </div>
      <div>
        <div>Question amount: {props.questionArr.length}</div>
        <div>Mark amount: {props.totalMark}</div>
        <Link to={`/testView/${props.id}`}>Open</Link>
      </div>
    </div>
  );
};
