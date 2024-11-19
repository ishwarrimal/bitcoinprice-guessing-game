import { useState, useEffect } from 'react';
const SECONDS_IN_MS = 1000;
export const useCountdown = (startTime, timeIntervalInSec) => {
  const [timeLeft, setTimeLeft] = useState(timeIntervalInSec);

  useEffect(() => {
    setTimeLeft(timeIntervalInSec)
    if (startTime) {
      const interval = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - startTime) / SECONDS_IN_MS);
        setTimeLeft(timeIntervalInSec - secondsPassed);
        if (secondsPassed >= timeIntervalInSec) {
          clearInterval(interval);
        }
      }, SECONDS_IN_MS);

      return () => clearInterval(interval);
    }
  }, [startTime, timeIntervalInSec]);

  return timeLeft;
};