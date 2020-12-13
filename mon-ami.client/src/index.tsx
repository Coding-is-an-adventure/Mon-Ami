import React from "react";
import ReactDOM from "react-dom";

import App from "./app/layout/App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import dateFnsLocalizer from "react-widgets-date-fns";

import ScrollToTop from "./app/layout/ScrollToTop";

import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "./app/layout/styles.css";
import "semantic-ui-css/semantic.min.css";

import reportWebVitals from "./reportWebVitals";

dateFnsLocalizer();
export const history = createBrowserHistory();

ReactDOM.render(
  //<React.StrictMode>
  <Router history={history}>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  //</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
