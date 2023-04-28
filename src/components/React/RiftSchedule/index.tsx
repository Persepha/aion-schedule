import { FC, useEffect, useState } from "react";

import moment from "moment";

import {
  isActivityToday,
  isTimeBetween,
} from "../../../utils/isCurrentActivities";

import type { RiftScheduleProps } from "./RiftSchedule.props";

export const RiftSchedule: FC<RiftScheduleProps> = ({ activities }) => {
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
                Region
              </th>
              <th scope="col" className="px-6 py-3">
                Weekday
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.region}
                className="bg-black/50 text-base text-white supports-[backdrop-filter]:backdrop-blur-xl"
              >
                <th
                  scope="row"
                  className={`whitespace-nowrap px-6 py-4 font-medium ${
                    isTimeBetween(activity.time_start, activity.time_end) &&
                    isActivityToday(activity.day)
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                      : ""
                  }`}
                >
                  {activity.region}
                </th>
                <td className="px-6 py-4"> {activity.day.join(", ")}</td>
                <td className="px-6 py-4">
                  {`${activity.time_start} - ${activity.time_end}`}
                </td>
                <td className="px-6 py-4">
                  {isTimeBetween(activity.time_start, activity.time_end) &&
                  isActivityToday(activity.day) ? (
                    <img src={`${import.meta.env.BASE_URL}/images/rift.png`}  alt="activity_status" />
                  ) : (
                    <img
                      className="grayscale"
                      src={`${import.meta.env.BASE_URL}/images/rift.png`}
                      alt="activity_status"
                    />
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
