import React, {useEffect, useState} from 'react';

const time = date => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return {hours, minutes, seconds};
};

const getTime = () => time(new Date());

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return currentTime;
};
