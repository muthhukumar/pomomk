import React from "react";
import ReactDOM from "react-dom/client";

// TODO move the css files ot  styles folder
import "./styles.css";
import "./App.css";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { SessionsProvider } from "./utils/pomodoro/provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SessionsProvider>
      <RouterProvider router={router} />
    </SessionsProvider>
  </React.StrictMode>
);
