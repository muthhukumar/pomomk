import React from "react";
import ReactDOM from "react-dom/client";

// TODO move the css files ot  styles folder
import "./styles.css";
import "./App.css";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
