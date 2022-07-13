import React from "react";
import ReactDOM from "react-dom/client";
import AppModalWindow from "./modelWindow/AppModalWindow";
import App from "./App";
import BoopButton from "./backgrounMusic/AppBackgroundMusic";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BoopButton />
    <App />
    <AppModalWindow />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
