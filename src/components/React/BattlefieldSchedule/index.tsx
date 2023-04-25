import { FC, useEffect, useState } from "react";

import moment from "moment";

import {
  isTimeBetween,
} from "../../../utils/isCurrentActivities";

import type { BattlefieldScheduleProps } from "./BattlefieldSchedule.props";

export const BattlefieldSchedule: FC<BattlefieldScheduleProps> = ({
  activities,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("LT"));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [activities]);
  return (
    <section className="flex w-full items-center justify-center px-10 py-10">
      <div className="relative max-w-screen-lg overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-black/90 text-sm dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Entry level
              </th>
              <th scope="col" className="px-6 py-3">
                Entries
              </th>
              <th scope="col" className="px-6 py-3">
                Entry time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.name}
                className="bg-black/50 text-base text-white supports-[backdrop-filter]:backdrop-blur-xl"
              >
                <th
                  scope="row"
                  className={`whitespace-nowrap px-6 py-4 font-medium ${
                    activity["entry time"].some((time) =>
                      isTimeBetween(time.time_start, time.time_end)
                    )
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {activity.name}
                </th>
                <td className="px-6 py-4">{activity["entry lvl"]}</td>
                <td className="px-6 py-4">{activity.entries}</td>
                <td className="flex flex-col px-6 py-4">
                  {activity["entry time"].map((time, index) => (
                    <span key={index}>
                      {`${time.time_start} - ${time.time_end}`}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {activity["entry time"].some((time) =>
                    isTimeBetween(time.time_start, time.time_end)
                  ) ? (
                    <img
                      src="/images/battlefield_active.png"
                      alt="battlefield status"
                    />
                  ) : (
                    <img src="/images/battlefield.png" alt="activity_status" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
