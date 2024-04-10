
export function secondsBetweenTimestamps(timestamp1: number, timestamp2: number) {
  const millisecondsDiff = Math.abs(timestamp1 - timestamp2);
  return Math.floor(millisecondsDiff / 1000);
}


export class Session {
  _timeSpent: number = 0;
  startTime: number = 0;
  endTime: number = 0;
  constructor(public type: "work" | "rest") {}

  setStartTime(value: number) {
    this.startTime = value;

    this.computeTimeSpent();
  }

  setEndTime(value: number) {
    this.endTime = value;

    this.computeTimeSpent();
  }

  computeTimeSpent() {
    this._timeSpent = secondsBetweenTimestamps(this.startTime, this.endTime);
  }

  get timeSpent(): number {
    return this._timeSpent;
  }
}

export function secondsElapsedOnSessions(sessions: Array<Session>) {
  return sessions.reduce((total, session) => {
    if (session.endTime === 0) {
      return total + secondsBetweenTimestamps(session.startTime, Date.now());
    }

    return total + session.timeSpent;
  }, 0);
}

export function getLastSessionType(_sessions: Array<Session>) {
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
