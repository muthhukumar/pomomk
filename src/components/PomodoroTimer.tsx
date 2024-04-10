import { usePomodoroTimer } from "../utils/pomodoro/hooks";

import Button from "./Button";
import Clock from "./Clock";

export default function App() {
  const {
    status,
    action: { stop, start, resume, pause, takeBreak, startWork },
    reverseClock,
    sessionType,
  } = usePomodoroTimer({});

  return (
    <div className="w-full justify-center h-screen flex items-center flex-col">
      <p className="border rounded-full px-5 py-1 mb-8">
        {sessionType === "work" ? "Work" : "Short Break"}
      </p>
      <Clock sec={reverseClock.seconds} min={reverseClock.minutes} />
      <div className="mt-5 flex items-center gap-3">
        {!status.isRunning && !status.isPaused && (
          <Button onClick={start}>Start</Button>
        )}
        {status.isRunning && <Button onClick={pause}>Pause</Button>}
        {status.isPaused && <Button onClick={resume}>Resume</Button>}
        {status.isWorking && <Button onClick={takeBreak}>Take a Break</Button>}
        {status.isResting && <Button onClick={startWork}>Start Work</Button>}
        {status.isStarted && <Button onClick={stop}>Stop</Button>}
      </div>
    </div>
  );
}
