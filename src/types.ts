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

export interface iQuestion {
  id: number;
  question: string;
  imgURL: string | null;
}

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

export interface iSimpleQues extends iQuestion {
  optionsArr: iRegularOption[];
  correctOptionId: number;
  optionsCount: number;
}

export interface iMultipleQues extends iQuestion {
  optionsArr: iRegularOption[];
  correctOptionsId: number[];
  optionsCount: number;
}

export interface iMatchQues extends iQuestion {
  optionsArr: iMatchOption[];
  answerArr: iMatchAnswer[];
  pairCount: number;
}

export interface iWrittenQues extends iQuestion {
  correctAnswer: string;
}
