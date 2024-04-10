export default function Clock({
  days,
  hours,
  min,
  sec,
}: {
  days?: number | string;
  hours?: number | string;
  min: number | string;
  sec: number | string;
}) {
  return (
    <>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        {Boolean(days) && (
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {/* @ts-ignore */}
              <span style={{ "--value": days ?? 0 }}></span>
            </span>
            days
          </div>
        )}
        {Boolean(hours) && (
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {/* @ts-ignore */}
              <span style={{ "--value": hours ?? 0 }}></span>
            </span>
            hours
          </div>
        )}
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
              {/* @ts-ignore */}
            <span style={{ "--value": min }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
              {/* @ts-ignore */}
            <span style={{ "--value": sec }}></span>
          </span>
          sec
        </div>
      </div>
    </>
  );
}
