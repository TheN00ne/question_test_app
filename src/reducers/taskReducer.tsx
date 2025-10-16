import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iInitialState, iTest } from "../types";

let initialState: iInitialState = {
  testArr: [],
};

const testReducer = createSlice({
  name: "testSlice",
  initialState: initialState,
  reducers: {
    createTest: (state, action: PayloadAction<iTest>) => {
      state.testArr.push(action.payload);
    },
    updateTest: (state, action: PayloadAction<{ id: number; test: iTest }>) => {
      state.testArr[action.payload.id] = action.payload.test;
    },
    deleteTest: (state, action: PayloadAction<number>) => {
      state.testArr = state.testArr.filter(
        (test) => test.id !== action.payload
      );
    },
  },
});

export const { createTest, deleteTest } = testReducer.actions;
export default testReducer.reducer;
