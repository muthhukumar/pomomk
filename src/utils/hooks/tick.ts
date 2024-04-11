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

    // After we're stopping if we reset the sessions it is not rendering because we're using the ref. So by updating the ref it is not rerendering. So we just need to do this.
    setRerenderCount((c) => c + 1);
  }

  return { running, tick, halt, rerenderCount };
}
