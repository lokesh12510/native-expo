import moment from "moment";

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const timings = [
  "01-02",
  "02-03",
  "03-04",
  "04-05",
  "05-06",
  "06-07",
  "07-08",
  "08-09",
  "09-10",
  "10-11",
  "11-12",
  "12-01",
];

export const period = ["AM", "PM"];

// get current day

export function getCurrentDay() {
  return moment(new Date()).format("dddd");
}

// get current day index

export function getCurrentDayIndex(day) {
  return days.indexOf(day);
}

// get current timing

export function getCurrentTiming() {
  return `${moment(new Date()).format("hh")}-${moment(new Date())
    .add(1, "hours")
    .format("hh")}`;
}

// get current timing index

export function getCurrentTimingIndex(timing) {
  return timings.indexOf(timing);
}

// get current period

export function getCurrentPeriod() {
  return moment(new Date()).format("a").toUpperCase();
}

// get current period index

export function getCurrentPeriodIndex(session) {
  return period.indexOf(session);
}
