import React, { ChangeEvent } from "react";
import { iQuestion } from "../types";

export const BasicQuestionForm: React.FC<{
  changeTitle: (value: string) => void;
  changeURL: (value: string) => void;
  changeAmount: (value: number) => void;
  getQuest: () => iQuestion | undefined;
}> = (props) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Question input..."
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          props.changeTitle;
        }}
      />
      <img src={props.getQuest()?.imgURL!} width="100px" alt="" />
      <input
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const file = e.currentTarget.files?.[0];
          if (file) {
            props.changeURL;
          }
        }}
      />
      <input
        type="number"
        min={0.1}
        placeholder="Grade amount input..."
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          props.changeAmount;
        }}
      />
    </form>
  );
};
