import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import testReducer from "./reducers/taskReducer";
import { CreateTestPage } from "./components/CreateTestPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: testReducer,
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateTestPage />}></Route>
        <Route path="/create" element={<CreateTestPage />}></Route>
        {/* <Route path="test/:id" element={}></Route> */}
      </Routes>
    </BrowserRouter>
  </Provider>
);
