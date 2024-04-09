import { usePomodoroTimer } from "../utils/hooks";

import Button from "./Button";
import Clock from "./Clock";
import Sessions from "./Sessions";

export default function App() {
  const {
    start,
    resume,
    clock,
    sessions,
    pause,
    takeBreak,
    startWork,
    sessionType,
  } = usePomodoroTimer();

  return (
    <div className="h-screen">
      <p className="p-3">{sessionType === "work" ? "Work" : "Short Break"}</p>
      <Clock sec={clock.seconds} min={clock.minutes} />
      <div className="mt-5 flex items-center gap-3">
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
        <Button onClick={takeBreak}>Take a Break</Button>
        <Button onClick={startWork}>Start Work</Button>
      </div>
      <div className="my-3">
        <p className="font-bold mb-3">Sessions</p>
        <Sessions sessions={sessions} />
      </div>
    </div>
  );
}
