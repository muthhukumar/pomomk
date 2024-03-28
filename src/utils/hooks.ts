import * as React from "react";
import { addLeadingZero } from ".";

function secondsBetweenDates(timestamp1: number, timestamp2: number) {
  const millisecondsDiff = Math.abs(timestamp1 - timestamp2);
  return Math.floor(millisecondsDiff / 1000);
}

export function useTimeElapsed() {
  const [timeIntervals, setTimeIntervals] = React.useState<
    Array<{ startTime: number; endTime: number; type: "work" | "rest" }>
  >([]);
  const [rerenderCount, setRerenderCount] = React.useState(0);
  const [status, setStatus] = React.useState<
    "idle" | "running" | "stop" | "pause"
  >("idle");

  const start = React.useCallback(() => {
    setStatus("running");
    setTimeIntervals((prev) => [
      ...prev,
      { startTime: Date.now(), endTime: 0, type: "work" },
    ]);
  }, []);

  const stop = React.useCallback(() => {
    setStatus("idle");
    setTimeIntervals([]);
  }, []);

  const pause = () => {
    if (status !== "running") return;

    setStatus("pause");
    setTimeIntervals((state) => {
      const cloned = [...state];
      cloned[state.length - 1].endTime = Date.now();

      return cloned;
    });
  };

  const takeABreak = () => {
    setTimeIntervals((state) => {
      const cloned = [...state];

      cloned.push({ startTime: Date.now(), endTime: 0, type: "rest" });

      return cloned;
    });
  };

  const resume = React.useCallback(() => {
    setStatus("running");

    setTimeIntervals((prev) => {
      const intervalType = prev[prev.length - 1]?.type || "work";

      if (intervalType === "rest") {
        return prev;
      }

      return [
        ...prev,
        { startTime: Date.now(), endTime: 0, type: intervalType },
      ];
    });
  }, [timeIntervals]);

  React.useEffect(() => {
    let intervalId: number | undefined;

    if (status === "running") {
      intervalId = setInterval(() => {
        setRerenderCount((count) => count + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  const totalSecondsElapsed = timeIntervals.reduce((total, interval) => {
    const endTime = interval.endTime || Date.now();
    return total + secondsBetweenDates(interval.startTime, endTime);
  }, 0);

  const lastInterval = timeIntervals[timeIntervals.length - 1];

  const intervalType = !lastInterval ? "idle" : lastInterval.type;

  const MAX_WORK_TIME = 25 * 60; // 25 minutes
  const MAX_REST_TIME = 5 * 60; // 5 minutes

  const lastIntervalTimeElapsed = secondsBetweenDates(
    lastInterval?.startTime || 0,
    Date.now()
  );

  const itsTime = !lastInterval
    ? false
    : lastInterval?.type === "work"
    ? lastIntervalTimeElapsed >= MAX_WORK_TIME
    : lastIntervalTimeElapsed >= MAX_REST_TIME;

  React.useEffect(() => {
    if (!lastInterval || !itsTime) return;

    if (lastInterval.type === "rest") {
      setTimeIntervals((state) => {
        const cloned = [...state];

        cloned[cloned.length - 1].endTime = Date.now();

        cloned.push({ startTime: Date.now(), endTime: 0, type: "work" });

        return cloned;
      });
    } else {
      setTimeIntervals((state) => {
        const cloned = [...state];

        cloned[cloned.length - 1].endTime = Date.now();

        cloned.push({ startTime: Date.now(), endTime: 0, type: "rest" });

        return cloned;
      });
    }
  }, [itsTime, lastInterval]);

  return {
    timeIntervals,
    intervalType,
    start,
    stop,
    pause,
    takeABreak,
    resume,
    clock: {
      seconds: addLeadingZero(totalSecondsElapsed % 60),
      minutes: addLeadingZero(Math.floor(totalSecondsElapsed / 60)),
    },
    restClock:
      lastInterval?.type === "rest"
        ? {
            seconds: addLeadingZero(
              (MAX_REST_TIME - lastIntervalTimeElapsed) % 60
            ),
            minutes: addLeadingZero(
              Math.floor((MAX_REST_TIME - lastIntervalTimeElapsed) / 60)
            ),
          }
        : { seconds: 0, minutes: 0 },
    rerenderCount,
    status,
  };
}
