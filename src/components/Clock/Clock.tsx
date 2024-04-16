import moment from 'moment-timezone';
import { FC, useEffect, useState } from 'react';

type ClockProps = {
  timeZone?: string;
};

export const Clock: FC<ClockProps> = ({ timeZone }: ClockProps) => {
  const [time, setTime] = useState(timeZone ? moment.tz(timeZone) : moment());
  const moment_obj = timeZone ? moment.tz(timeZone) : moment();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(timeZone ? moment.tz(timeZone) : moment());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {moment_obj.format('MMM DD, YYYY')} {time.format('h:mm:ss A')}
    </>
  );
};
