import { SlControlPause } from "react-icons/sl";
import { FaStop } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa6";

import { usePomodoroTimer } from "../utils/pomodoro/hooks";

import Button from "./Button";
import Clock from "./Clock";
import IconButton from "./IconButton";

export default function App() {
  const {
    status,
    action: { stop, start, resume, pause, takeBreak, startWork },
    reverseClock,
    sessionType,
  } = usePomodoroTimer({});

  return (
    <div className="w-full justify-center h-screen flex items-center flex-col">
      <h1 className="text-center mb-16 font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        Pomodoro Timer
      </h1>
      <p className="border border-smoke text-white rounded-full px-5 py-1 mb-8">
        {sessionType === "work" ? "Work" : "Short Break"}
      </p>
      <Clock sec={reverseClock.seconds} min={reverseClock.minutes} />
      <div className="mt-16 flex items-center gap-3">
        {!status.isRunning && !status.isPaused && (
          <Button onClick={start}>Start</Button>
        )}
        {status.isRunning && (
          <IconButton onClick={pause} icon={SlControlPause} />
        )}
        {status.isPaused && <IconButton onClick={resume} icon={FaPlay} />}
        {status.isWorking && (
          <Button onClick={takeBreak} className="mx-3">
            Take a Break
          </Button>
        )}
        {status.isResting && (
          <Button onClick={startWork} className="mx-3">
            Start Work
          </Button>
        )}
        {status.isStarted && <IconButton onClick={stop} icon={FaStop} />}
      </div>
    </div>
  );
}
