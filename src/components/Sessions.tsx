import {
  forwardClock,
  secondsElapsedOnSessions,
  separateWorkAndRestSession,
} from "../utils/hooks";

export default function Sessions({ sessions }: { sessions: Array<Session> }) {
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
