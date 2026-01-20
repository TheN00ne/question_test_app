import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import testReducer from "./reducers/taskReducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const LazyMainPage = lazy(() => import("./components/MainPage"));
const LazyCreateTestPage = lazy(() => import("./components/CreateTestPage"));
const LazyTestPageView = lazy(() => import("./components/TestPageView"));
const LazyTestPage = lazy(() => import("./components/TestPage"));
const LazyPassedTest = lazy(() => import("./components/PassedTest"));

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
      <Suspense fallback={<div>Завантаження сторінки...</div>}>
        <Routes>
          <Route path="/" element={<LazyMainPage />}></Route>
          <Route path="/create" element={<LazyCreateTestPage />}></Route>
          <Route path="/testView/:id" element={<LazyTestPageView />}></Route>
          <Route path="/test/:id" element={<LazyTestPage />}></Route>
          <Route path="/passedTest/:id" element={<LazyPassedTest />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
