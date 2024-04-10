import * as React from "react";
import { Session } from ".";

const SessionsContext = React.createContext<
  React.MutableRefObject<Array<Session>>
>({ current: [] });

export function SessionsProvider({ children }: { children: React.ReactNode }) {
  const sessions = React.useRef<Array<Session>>([]);

  return (
    <SessionsContext.Provider value={sessions}>
      {children}
    </SessionsContext.Provider>
  );
}

export function useSessions() {
  const context = React.useContext(SessionsContext);

  if (!context) {
    console.warn(`useSessions should be used inside SessionsProvider`);
  }

  return context;
}
