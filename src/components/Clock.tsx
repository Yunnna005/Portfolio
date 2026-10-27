import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-IE", {
  timeZone: "Europe/Dublin",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZoneName: "short",
});

// Live local time in Ireland, shown in the hero's terminal panel
export default function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="clock label">
      <span>Ireland</span>
      <time dateTime={now.toISOString()}>{format.format(now)}</time>
    </p>
  );
}
