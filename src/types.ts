import { MatchQuestion } from "./components/MatchQuestion";
import { MultipleQuestion } from "./components/MultipleQuestion";
import { SimpleQuestion } from "./components/SimpleQuestion";
import { WrittenQuestion } from "./components/WrittenQuestion";

export interface iInitialState {
  testArr: iTest[];
}

export interface iTest {
  id: number;
  title: string;
  description: string;
  imgURL: string | undefined;
  questionArr: iQuestion[];
  totalMark: number;
  isSetTimer: boolean;
  timeout: number | undefined;
}

export type questionTypes = "Simple" | "Multiple" | "Match" | "Written";

export type iQuestion =
  | iSimpleQuestion
  | iMultipleQuestion
  | iMatchQuestion
  | iWrittenQuestion;

export interface iRegularOption {
  id: number;
  answer: string;
  isCorrect: boolean;
}

export interface iMatchPair {
  id: number;
  option: string;
  answer: string;
  userAnswer: string;
}

export interface iSimpleQuestion {
  id: number;
  question: string;
  imgURL: string | null;
  type: "Simple";
  optionsArr: iRegularOption[];
  correctOptionId: number | undefined;
  gradeAmount: number;
}

export interface iMultipleQuestion {
  id: number;
  question: string;
  imgURL: string | null;
  type: "Multiple";
  optionsArr: iRegularOption[];
  correctOptionsId: number[];
  gradeAmount: number;
  isHardModeOn: boolean;
}

export interface iMatchQuestion {
  id: number;
  question: string;
  imgURL: string | null;
  type: "Match";
  pairs: iMatchPair[];
  gradeAmount: number;
  isHardModeOn: boolean;
}

export interface iWrittenQuestion {
  id: number;
  question: string;
  imgURL: string | null;
  type: "Written";
  correctAnswer: string;
  gradeAmount: number;
}
