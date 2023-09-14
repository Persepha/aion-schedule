import moment from "moment";
import { useEffect, useState } from "react";

export const ServerTime = () => {
  const [currentServerTime, setCurrentServerTime] = useState<string>("");
  const [currentServerDate, setCurrentServerDate] = useState<string>("");

  const updateServerTime = () => {
    const serverTime = moment().utc().add(3, "h");
    setCurrentServerTime(serverTime.format("h:mm:ss a"));
    setCurrentServerDate(serverTime.format("dddd, MMMM Do YYYY"));
  };

  useEffect(() => {
    updateServerTime();
    const interval = setInterval(() => {
      updateServerTime();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="flex items-center justify-center p-4">
      <div className="flex flex-col items-center rounded-lg bg-black/50 p-2 text-white supports-[backdrop-filter]:backdrop-blur-xl">
        <time className="text-3xl">{currentServerTime}</time>

        <time className="text-neutral-500">{currentServerDate}</time>
        <span className="text-neutral-500">{"Server time (UTC +3)"}</span>
      </div>
    </section>
  );
};
