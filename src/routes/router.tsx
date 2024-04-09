import { createBrowserRouter } from "react-router-dom";

import Root from "./root";
import Sessions from "./sessions";
import Analytics from "./analytics";
import Settings from "./Settings";
import PomodoroTimerPage from "./pomodoro-timer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/pomo",
        element: <PomodoroTimerPage />,
      },
      {
        path: "/sessions",
        element: <Sessions />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);
