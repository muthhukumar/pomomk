import "./App.css";
import "./index.css";
import { useTimeElapsed } from "./utils/hooks";
import { Button } from "./components";

function App() {
  const {
    takeABreak,
    status,
    clock,
    intervalType,
    restClock,
    start,
    pause,
    resume,
    stop,
  } = useTimeElapsed();

  return (
    <div className="p-4">
      {intervalType === "rest" ? (
        <div className="w-fit mx-auto">
          <p className="text-center mb-2">Take a Break</p>
          <div className="border rounded-md p-3">
            <p className="font-bold text-5xl">
              {restClock.minutes}: {restClock.seconds}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-fit border rounded-md p-3 mx-auto">
          <p className="font-bold text-5xl">
            {clock.minutes}: {clock.seconds}
          </p>
        </div>
      )}
      <div className="flex gap-3 w-fit mx-auto mt-8">
        {status === "idle" && (
          <Button
            onClick={() => {
              start();
            }}
          >
            Start
          </Button>
        )}
        {status === "pause" && (
          <Button
            onClick={() => {
              resume();
            }}
          >
            Resume
          </Button>
        )}
        {status === "running" && (
          <Button
            onClick={() => {
              pause();
            }}
          >
            Pause
          </Button>
        )}
        {status !== "idle" && (
          <Button
            onClick={() => {
              stop();
            }}
          >
            Reset
          </Button>
        )}
        {status !== "idle" && (
          <Button
            onClick={() => {
              takeABreak();
            }}
          >
            Take a Break
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
