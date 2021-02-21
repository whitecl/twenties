import { fromUnixTime, getUnixTime, intervalToDuration } from "date-fns";
import { pipe } from "ramda";
import React, { createContext, useContext, useEffect, useState } from "react";

const twenty = 20 * 60;

const timestampForTimer = () => getUnixTime(new Date()) + twenty;

const formatTimeLeft = endTimestamp => {
  if (!endTimestamp || getUnixTime(new Date()) > endTimestamp) {
    return null;
  }

  return pipe(
    timestamp => fromUnixTime(timestamp),
    endDate => intervalToDuration({ start: new Date(), end: endDate }),
    duration =>
      `${duration.minutes
        .toString()
        .padStart(2, "0")}:${duration.seconds.toString().padStart(2, "0")}`
  )(endTimestamp);
};

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [currentEndTime, setCurrentEndTime] = useState();
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    setTimeout(() => setTicker(ticker + 1), 1000);
  });

  const start = () => setCurrentEndTime(timestampForTimer());
  const timeLeft = formatTimeLeft(currentEndTime);

  return (
    <TimerContext.Provider value={{ start, timeLeft }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
