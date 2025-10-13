import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import testReducer from "./reducers/taskReducer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: testReducer,
});

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
