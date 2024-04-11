import * as React from "react";

export function useTick() {
  const [running, setRunning] = React.useState(false);
  const [rerenderCount, setRerenderCount] = React.useState(0);

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

  function tick() {
    setRunning(true);
  }

  function halt() {
    setRunning(false);
  }

  return { running, tick, halt, rerenderCount };
}
