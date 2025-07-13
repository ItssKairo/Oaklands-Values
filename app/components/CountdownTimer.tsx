'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  resetTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ resetTime }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date(resetTime);
    if (isNaN(targetDate.getTime())) {
      setTimeLeft({}); 
      return;
    }

    const calculateAndUpdateTime = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = {};

      if (difference > 0) {
        newTimeLeft = {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60)) % 60,
          seconds: Math.floor((difference / 1000)) % 60,
        };
      } else {

      }
      setTimeLeft(newTimeLeft);
    };

    calculateAndUpdateTime();

    const timer = setInterval(calculateAndUpdateTime, 1000);

    return () => clearInterval(timer);
  }, [resetTime]);

  const timerComponents: React.JSX.Element[] = [];

  const { hours, minutes, seconds } = timeLeft as { hours?: number; minutes?: number; seconds?: number };

  if (hours !== undefined && hours > 0) {
    timerComponents.push(
      <span key="hours">
        {hours} {hours === 1 ? 'hour' : 'hours'}
      </span>
    );
  }
  if (minutes !== undefined && minutes > 0 || (hours !== undefined && hours > 0 && minutes !== undefined)) {
    timerComponents.push(
      <span key="minutes">
        {minutes} {minutes === 1 ? 'minute' : 'minutes'}
      </span>
    );
  }
  if (seconds !== undefined && seconds > 0 || ((hours !== undefined && hours > 0 || minutes !== undefined && minutes > 0) && seconds !== undefined)) {
    timerComponents.push(
      <span key="seconds">
        {seconds} {seconds === 1 ? 'second' : 'seconds'}
      </span>
    );
  }

  return (
    <div className="text-sm text-gray-400 mt-4 text-center">
      {timerComponents.length ? (
        <p>Next Refresh in: {timerComponents.join(', ')}</p>
      ) : (
        <p>Refreshing soon...</p>
      )}
    </div>
  );
};

export default CountdownTimer;