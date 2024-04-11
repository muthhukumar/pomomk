import * as React from "react";
import { useSessions } from "./provider";
import {
  forwardClock,
  getLastSessionType,
  reverseClock,
  secondsElapsedOnSessions,
  Session,
} from ".";
import { useTick } from "../hooks/tick";

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

export const usePomodoroTimer = ({
  workInterval = 25,
  breakInterval = 5,
}: {
  workInterval?: number;
  breakInterval?: number;
}) => {
  const { running, tick, halt } = useTick();

  const sessions = useSessions();

  const workFinishedAudio = useMusicPlayer("/audio/work.wav");
  const restFinishedAudio = useMusicPlayer("/audio/rest-finished.mp3");

  const MAX_REST_TIME = breakInterval * 60;
  const MAX_WORK_TIME = workInterval * 60;

  function start() {
    tick();

    const newSession = new Session("work");
    newSession.setStartTime(Date.now());
    newSession.setEndTime(0);

    sessions.current.push(newSession);
  }

  function pause() {
    halt();

    const lastSession = sessions.current[sessions.current.length - 1];

    if (lastSession) lastSession.setEndTime(Date.now());
  }

  function resume() {
    tick();

    const lastSession = sessions.current[sessions.current.length - 1];

    const newSession = new Session(lastSession.type);
    newSession.setStartTime(Date.now());
    newSession.setEndTime(0);

    sessions.current.push(newSession);
  }

  function takeBreak() {
    sessions.current[sessions.current.length - 1].endTime = Date.now();

    const newSession = new Session("rest");
    newSession.setStartTime(Date.now());
    newSession.setEndTime(0);

    sessions.current.push(newSession);
  }

  function startWork() {
    sessions.current[sessions.current.length - 1].endTime = Date.now();

    const newSession = new Session("work");
    newSession.setStartTime(Date.now());
    newSession.setEndTime(0);

    sessions.current.push(newSession);
  }

  function stop() {
    sessions.current = [];

    halt();
  }

  const lastFullSession = getLastSessionType(sessions.current);

  const seconds = secondsElapsedOnSessions(lastFullSession.sessions);

  const itsTime =
    lastFullSession.lastSessionType === "work"
      ? seconds >= MAX_WORK_TIME
      : seconds >= MAX_REST_TIME;

  React.useEffect(() => {
    if (!itsTime) return;

    if (lastFullSession.lastSessionType === "work") {
      restFinishedAudio.togglePlay();
      takeBreak();
    } else if (lastFullSession.lastSessionType === "rest") {
      workFinishedAudio.togglePlay();
      startWork();
    }
  }, [itsTime, lastFullSession]);

  const sessionType = lastFullSession.lastSessionType;

  return {
    status: {
      isRunning: running,
      isPaused: !running && sessions.current.length > 0,
      isWorking: running && lastFullSession.lastSessionType === "work",
      isResting: running && lastFullSession.lastSessionType === "rest",
      isStarted: sessions.current.length > 0,
    },
    running,
    action: {
      start,
      resume,
      pause,
      startWork,
      takeBreak,
      stop,
    },
    sessions,
    seconds,
    sessionType,
    clock: forwardClock(seconds),
    reverseClock: reverseClock(
      seconds,
      sessionType === "work" ? MAX_WORK_TIME : MAX_REST_TIME
    ),
  } as const;
};
