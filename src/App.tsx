import "./App.css";
import "./index.css";

import { Button, Clock } from "./components";
import {
  Session,
  forwardClock,
  secondsElapsedOnSessions,
  separateWorkAndRestSession,
  usePomodoroTimer,
} from "./utils/hooks";

function App() {
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
    <div className="p-3">
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

function Sessions({ sessions }: { sessions: Array<Session> }) {
  const { work, rest } = separateWorkAndRestSession(sessions);

  return (
    <div className="flex items-start gap-6">
      <div>
        <p className="font-bold mb-6">Work Sessions</p>
        <div className="flex flex-col gap-3">
          {work.map((s, idx) => {
            const seconds = secondsElapsedOnSessions([s]);
            const clock = forwardClock(seconds);
            return (
              <div className="flex gap-5" key={idx}>
                <div>
                  <span className="countdown font-mono text-4xl">
                    {/* @ts-ignore */}
                    <span style={{ "--value": clock.minutes }}></span>
                  </span>
                  min
                </div>
                <div>
                  <span className="countdown font-mono text-4xl">
                    {/* @ts-ignore */}
                    <span style={{ "--value": clock.seconds }}></span>
                  </span>
                  sec
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <p className="font-bold mb-6">Rest Sessions</p>
        <div className="flex flex-col gap-3">
          {rest.map((s, idx) => {
            const seconds = secondsElapsedOnSessions([s]);
            const clock = forwardClock(seconds);
            return (
              <div className="flex gap-5" key={idx}>
                <div>
                  <span className="countdown font-mono text-4xl">
                    {/* @ts-ignore */}
                    <span style={{ "--value": clock.minutes }}></span>
                  </span>
                  min
                </div>
                <div>
                  <span className="countdown font-mono text-4xl">
                    {/* @ts-ignore */}
                    <span style={{ "--value": clock.seconds }}></span>
                  </span>
                  sec
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
