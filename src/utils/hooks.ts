import * as React from "react";
import { addLeadingZero } from ".";

function secondsBetweenDates(timestamp1: number, timestamp2: number) {
  const millisecondsDiff = Math.abs(timestamp1 - timestamp2);
  return Math.floor(millisecondsDiff / 1000);
}

export function useTimeElapsed({
  workTime = 25, // 25 minutes
  breakTime = 5, // 5 minutes
}: {
  workTime?: number;
  breakTime?: number;
}) {
  const [timeIntervals, setTimeIntervals] = React.useState<
    Array<{ startTime: number; endTime: number; type: "work" | "rest" }>
  >([]);
  const [rerenderCount, setRerenderCount] = React.useState(0);
  const [status, setStatus] = React.useState<
    "idle" | "running" | "stop" | "pause"
  >("idle");

  const workFinishedAudio = useMusicPlayer("/audio/work-finished.mp3");
  const restFinishedAudio = useMusicPlayer("/audio/rest-finished.mp3");

  // Converting to seconds
  const MAX_WORK_TIME = workTime * 60;
  const MAX_REST_TIME = breakTime * 60;

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
        restFinishedAudio.togglePlay();
        const cloned = [...state];

        cloned[cloned.length - 1].endTime = Date.now();

        cloned.push({ startTime: Date.now(), endTime: 0, type: "work" });

        return cloned;
      });
    } else {
      setTimeIntervals((state) => {
        workFinishedAudio.togglePlay();

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

export const useMusicPlayer = (filePath: string) => {
  const [audio] = React.useState(new Audio(filePath));
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    audio.volume = 0.3;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return {
    togglePlay,
    isPlaying,
  };
};
