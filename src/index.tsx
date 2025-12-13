import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import testReducer from "./reducers/taskReducer";
import { CreateTestPage } from "./components/CreateTestPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { TestPage } from "./components/TestPage";
import { TestPageView } from "./components/TestPageView";
import { PassedTest } from "./components/PassedTest";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: testReducer,
});

export type RootState = ReturnType<typeof store.getState>;

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/create" element={<CreateTestPage />}></Route>
        <Route path="/testView/:id" element={<TestPageView />}></Route>
        <Route path="/test/:id" element={<TestPage />}></Route>
        <Route path="/passedTest/:id" element={<PassedTest />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
