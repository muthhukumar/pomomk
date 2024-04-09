import * as React from "react";

function secondsBetweenDates(timestamp1: number, timestamp2: number) {
  const millisecondsDiff = Math.abs(timestamp1 - timestamp2);
  return Math.floor(millisecondsDiff / 1000);
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

export type Session = {
  startTime: number;
  endTime: number;
  type: "work" | "rest";
};

export const usePomodoroTimer = ({
  workInterval = 25,
  breakInterval = 5,
}: {
  workInterval?: number;
  breakInterval?: number;
}) => {
  const [running, setRunning] = React.useState(false);
  const [rerenderCount, setRerenderCount] = React.useState(0);
  const [sessions, setSessions] = React.useState<Array<Session>>([]);

  const workFinishedAudio = useMusicPlayer("/audio/work.wav");
  const restFinishedAudio = useMusicPlayer("/audio/rest-finished.mp3");

  const MAX_REST_TIME = breakInterval * 60;
  const MAX_WORK_TIME = workInterval * 60;

  function start() {
    setRunning(true);
    setSessions((state) => {
      const session = [...state];

      session.push({ startTime: Date.now(), endTime: 0, type: "work" });

      return session;
    });
  }

  function pause() {
    setRunning(false);

    setSessions((state) => {
      const session = [...state];

      const lastSession = session[session.length - 1];

      lastSession.endTime = Date.now();

      return session;
    });
  }

  function resume() {
    setRunning(true);

    setSessions((state) => {
      const session = [...state];

      const lastSession = session[session.length - 1];

      session.push({
        startTime: Date.now(),
        endTime: 0,
        type: lastSession.type,
      });

      return session;
    });
  }

  function takeBreak() {
    setSessions((state) => {
      const session = [...state];

      session[session.length - 1].endTime = Date.now();

      session.push({
        startTime: Date.now(),
        endTime: 0,
        type: "rest",
      });

      return session;
    });
  }

  function startWork() {
    setSessions((state) => {
      const session = [...state];

      session[session.length - 1].endTime = Date.now();

      session.push({
        startTime: Date.now(),
        endTime: 0,
        type: "work",
      });

      return session;
    });
  }

  function stop() {
    setSessions([]);

    setRunning(false);
  }

  React.useEffect(() => {
    let intervalId: number | undefined;

    if (running) {
      intervalId = setInterval(() => {
        setRerenderCount((count) => count + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const lastFullSession = getLastSessionType(sessions);

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
      isPaused: !running && sessions.length > 0,
      isWorking: running && lastFullSession.lastSessionType === "work",
      isResting: running && lastFullSession.lastSessionType === "rest",
      isStarted: sessions.length > 0,
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
    rerenderCount,
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

export function secondsElapsedOnSessions(sessions: Array<Session>) {
  return sessions.reduce((total, session) => {
    const endTime = session.endTime || Date.now();
    const result = secondsBetweenDates(session.startTime, endTime);
    return total + result;
  }, 0);
}

function getLastSessionType(_sessions: Array<Session>) {
  const sessions = [..._sessions];

  const lastSessionType = sessions[sessions.length - 1]?.type || "work";

  const result: Array<Session> = [];

  for (const session of sessions.reverse()) {
    if (session.type !== lastSessionType) {
      break;
    }

    result.push(session);
  }

  return {
    sessions: result.reverse(),
    lastSessionType: lastSessionType,
  };
}

export function forwardClock(seconds: number) {
  return {
    seconds: Math.floor(seconds % 60),
    minutes: Math.floor(seconds / 60),
  };
}

export function reverseClock(seconds: number, totalTime: number) {
  return {
    minutes: Math.floor((totalTime - seconds) / 60),
    seconds: Math.floor((totalTime - seconds) % 60),
  };
}

export function separateWorkAndRestSession(sessions: Array<Session>) {
  const result: {
    work: Array<Session>;
    rest: Array<Session>;
  } = {
    work: [],
    rest: [],
  };

  for (const session of sessions) {
    result[session.type].push(session);
  }

  return result;
}
