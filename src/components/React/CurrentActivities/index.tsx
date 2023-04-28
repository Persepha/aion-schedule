import { FC, useEffect, useState } from "react";
import {
  isActivityToday,
  isTimeBetween,
} from "../../../utils/isCurrentActivities";
import type { CurrentActivitiesProps } from "./CurrentActivities.props";
import type {
  FortressScheduleActivity,
  RiftScheduleActivity,
  ScheduleBattlefieldActivity,
} from "../../../types";

export const CurrentActivities: FC<CurrentActivitiesProps> = ({
  battlefields,
  rifts,
  fortress,
}) => {
  const [currentRifts, setCurrentRifts] = useState<RiftScheduleActivity[]>([]);
  const [currentFortress, setCurrentFortress] = useState<
    FortressScheduleActivity[]
  >([]);
  const [currentBattleFields, setCurrentBattleFields] = useState<
    ScheduleBattlefieldActivity[]
  >([]);

  const updateActivities = () => {
    setCurrentRifts(
      rifts.filter(
        (rift) =>
          isTimeBetween(rift.time_start, rift.time_end) &&
          isActivityToday(rift.day)
      )
    );
    setCurrentFortress(
      fortress.filter(
        (fortress) =>
          isTimeBetween(fortress.time_start, fortress.time_end) &&
          isActivityToday(fortress.day)
      )
    );
    setCurrentBattleFields(
      battlefields.filter((battlefield) =>
        battlefield["entry time"].some((time) =>
          isTimeBetween(time.time_start, time.time_end)
        )
      )
    );
  };

  useEffect(() => {
    updateActivities();

    const interval = setInterval(() => {
      updateActivities();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <section className="flex w-full items-center justify-center px-10 py-8">
      <div className="flex gap-8 overflow-x-auto rounded-lg bg-black/50 p-4 supports-[backdrop-filter]:backdrop-blur-xl">
        {currentFortress.length > 0 ? (
          <article>
            <header className="bg-gradient-to-tr from-[#ec6f59] to-[#fad15c] bg-clip-text py-2 text-lg font-extrabold text-transparent">
              Fortress Battle:
            </header>
            <ol className="relative border-l  border-gray-700 p-2">
              {currentFortress.map((fortress, index) => (
                <li className="mb-10 ml-4" key={index}>
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-[#ec6f59] bg-[#fad15c]"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-white">
                    {`${fortress.time_start} - ${fortress.time_end}`}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {fortress.name}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {fortress.location}
                  </p>
                </li>
              ))}
            </ol>
          </article>
        ) : null}

        {currentRifts.length > 0 ? (
          <article>
            <header className="bg-gradient-to-tr from-[#ec6f59] to-[#fad15c] bg-clip-text py-2 text-lg font-extrabold text-transparent">
              Rifts:
            </header>
            <ol className="relative border-l  border-gray-700 p-2">
              {currentRifts.map((rift, index) => (
                <li className="mb-10 ml-4" key={index}>
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-[#ec6f59] bg-[#fad15c]"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-white">
                    {`${rift.time_start} - ${rift.time_end}`}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {rift.region}
                  </h3>
                </li>
              ))}
            </ol>
          </article>
        ) : null}

        {currentBattleFields.length > 0 ? (
          <article>
            <header className="bg-gradient-to-tr from-[#ec6f59] to-[#fad15c] bg-clip-text py-2 text-lg font-extrabold text-transparent">
              Battlefields:
            </header>
            <ol className="relative border-l  border-gray-700 p-2">
              {currentBattleFields.map((battlefield, index) => (
                <li className="mb-10 ml-4" key={index}>
                  <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-[#ec6f59] bg-[#fad15c]"></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {battlefield.name}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {battlefield.entries}
                  </p>
                </li>
              ))}
            </ol>
          </article>
        ) : null}
      </div>
    </section>
  );
};
