import moment from "moment";

export const isTimeBetween = (start: string, end: string) => {
    if (start === "Any time" || end === "Any time") {
      return true;
    }

    const format = "LT";

    const startTime = moment(start, format);
    const endTime = moment(end, format);
    const currentTime = moment(moment().format(format), format) ;

    const midnight = moment('12:00 AM', format);

    if (endTime.isBefore(startTime)) {
      if (currentTime.isBetween(midnight, endTime, undefined, "[]")) {
        currentTime.add(1, 'days')
      }

      endTime.add(1, 'days')
    }

    return currentTime.isBetween(
      startTime,
      endTime,
      undefined,
      "[]"
    );
};

export const isActivityToday = (days: string[]) => {
    const today = moment().format("dddd");
    return days.includes(today)
}
