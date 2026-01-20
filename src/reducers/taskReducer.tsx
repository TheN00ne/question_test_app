import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iInitialState, iTest } from "../types";

let initialState: iInitialState = {
  testArr: [
    {
      id: Date.now(),
      title: "Title 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio at placeat inventore fugiat necessitatibus dolorem culpa molestias aspernatur impedit. Labore quasi corrupti amet odio atque quam ad vel numquam molestiae aut repellendus laudantium minus incidunt fugit velit illo, veritatis ea repudiandae sint. Molestiae, cum natus laboriosam consectetur ipsum recusandae excepturi necessitatibus laudantium repudiandae soluta corrupti a expedita libero illum quas, officiis commodi accusamus quos minima impedit maxime ut quisquam cumque fugiat. In dolor quam facere animi nobis nostrum architecto officia temporibus accusamus minus consectetur vero omnis sint ullam eum possimus enim molestiae minima similique doloribus modi odit, voluptatum dolores sequi!",
      imgURL: undefined,
      isHiddenCorrectAnswers: false,
      isHiddenQuestions: false,
      questionArr: [
        {
          id: 1,
          question: "Simple Question",
          imgURL: null,
          type: "Simple",
          optionsArr: [
            {
              id: 2,
              answer: "Answer 1",
              isCorrect: true,
            },
            {
              id: 3,
              answer: "Answer 2",
              isCorrect: false,
            },
            {
              id: 4,
              answer: "Answer 3",
              isCorrect: false,
            },
          ],
          correctOptionId: 2,
          gradeAmount: 5,
        },
        {
          id: 5,
          question: "Multiple Question",
          imgURL: null,
          type: "Multiple",
          optionsArr: [
            { id: 6, answer: "Answer 1", isCorrect: true },
            { id: 7, answer: "Answer 2", isCorrect: false },
            { id: 8, answer: "Answer 3", isCorrect: false },
            { id: 9, answer: "Answer 4", isCorrect: true },
          ],
          correctOptionsId: [6, 9],
          gradeAmount: 5,
          isHardModeOn: false,
        },
        {
          id: 10,
          question: "Match question",
          imgURL: null,
          type: "Match",
          pairs: [
            {
              id: 11,
              option: "Option 6",
              answer: "Answer 6",
              userAnswer: "---",
            },
            {
              id: 12,
              option: "Option 7",
              answer: "Answer 7",
              userAnswer: "---",
            },
            {
              id: 13,
              option: "Option 8",
              answer: "Answer 8",
              userAnswer: "---",
            },
          ],
          gradeAmount: 5,
          isHardModeOn: false,
        },
        {
          id: 14,
          question: "WrittenQuestion",
          imgURL: null,
          type: "Written",
          correctAnswer: "AnswerO",
          gradeAmount: 10,
        },
      ],
      totalMark: 25,
      isSetTimer: true,
      timeout: 15,
    },
  ],
};

const testReducer = createSlice({
  name: "testSlice",
  initialState: initialState,
  reducers: {
    createTest: (state, action: PayloadAction<iTest>) => {
      state.testArr.push(action.payload);
    },
    deleteTest: (state, action: PayloadAction<number>) => {
      state.testArr = state.testArr.filter(
        (test) => test.id !== action.payload,
      );
    },
  },
});

export const { createTest, deleteTest } = testReducer.actions;
export default testReducer.reducer;
