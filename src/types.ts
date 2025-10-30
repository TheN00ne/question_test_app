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
  imgURL: string;
  questionArr: [];
  totalMark: number;
  isSetTimer: boolean;
  timeout: number | null;
}

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

export interface iMatchOption {
  id: number;
  question: string;
}

export interface iMatchAnswer {
  id: number;
  answer: string;
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
  optionsArr: iMatchOption[];
  answerArr: iMatchAnswer[];
  pairCount: number;
  gradeAmount: number;
}

export interface iWrittenQuestion {
  id: number;
  question: string;
  imgURL: string | null;
  type: "Written";
  correctAnswer: string;
  gradeAmount: number;
}
