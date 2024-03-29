import "./App.css";
import "./index.css";
import * as React from "react";
import { useTimeElapsed } from "./utils/hooks";
import { Button, RadioInput } from "./components";

function App() {
  const [breakTime, setBreakTime] = React.useState("5");
  const [workTime, setWorkTime] = React.useState("25");
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
  } = useTimeElapsed({
    breakTime: Number(breakTime),
    workTime: Number(workTime),
  });

  return (
    <div className="p-4">
      <div className="my-8 underline">
        <p className="text-center font-bold text-4xl">pomomk</p>
      </div>
      {intervalType === "rest" && (
        <div className="w-fit mx-auto">
          <p className="text-center mb-2">Take a Break</p>
          <div className="border rounded-md p-3">
            <p className="font-bold text-5xl">
              {restClock.minutes}: {restClock.seconds}
            </p>
          </div>
        </div>
      )}
      {intervalType !== "idle" && intervalType === "work" && (
        <div className="w-fit border rounded-md p-3 mx-auto">
          <p className="font-bold text-5xl">
            {clock.minutes}: {clock.seconds}
          </p>
        </div>
      )}
      <div className="flex w-fit mx-auto mt-8">
        <div>
          <p className="font-bold mb-1">Select Work time(minutes)</p>
          <RadioInput
            disabled={intervalType !== "idle"}
            value={workTime}
            setValue={setWorkTime}
            name="break-time"
          >
            <RadioInput.Option value={"25"} />
            <RadioInput.Option value={"45"} />
            <RadioInput.Option value={"60"} />
          </RadioInput>
        </div>
      </div>
      <div className="flex w-fit mx-auto mt-8">
        <div>
          <p className="font-bold mb-1">Select Break time(minutes)</p>
          <RadioInput
            value={breakTime}
            disabled={intervalType !== "idle"}
            setValue={setBreakTime}
            name="break-time"
          >
            <RadioInput.Option value={"5"} />
            <RadioInput.Option value={"10"} />
            <RadioInput.Option value={"15"} />
          </RadioInput>
        </div>
      </div>
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
