// icons from https://github.com/basmilius/weather-icons
import clearDay from "./icons/clear-day.png";
import clearNight from "./icons/clear-night.png";
import cloudy from "./icons/cloudy.png";
import drizzle from "./icons/drizzle.png";
import dust from "./icons/dust.png";
import fog from "./icons/fog.png";
import haze from "./icons/haze.png";
import mist from "./icons/mist.png";
import rain from "./icons/rain.png";
import smoke from "./icons/smoke.png";
import snow from "./icons/snow.png";
import thunderstormsDay from "./icons/thunderstorms-day.png";
import thunderstormsNight from "./icons/thunderstorms-night.png";
import windAlert from "./icons/wind-alert.png";

/* function for mapping weather conditons from OpenWeatherMap
to corresponding png icon.  Assumes input will be given
in the format Rain_day with _day or _night appended to condition.
If it cannot find a match for day/night it removes the appended
_day/_night and matches that instead */
const weatherMapper = (input: string) => {
  const mapping: any = {
    Thunderstorm_day: thunderstormsDay,
    Thunderstorm_night: thunderstormsNight,
    Drizzle: drizzle,
    Rain: rain,
    Snow: snow,
    Mist: mist,
    Smoke: smoke,
    Haze: haze,
    Dust: dust,
    Fog: fog,
    Sand: dust,
    Ash: dust,
    Squall: windAlert,
    Tornado: windAlert,
    Clear_day: clearDay,
    Clear_night: clearNight,
    Clouds: cloudy,
  };
  let access = mapping[input];
  if (access === undefined) {
    access = mapping[input.split("_")[0]];
  }
  return access;
};

/* we want the current date so we can determine the days
  of the week and locate the correct forecasted weather for
  that day */
const baseDate = new Date();
const hours = baseDate.getHours();
/* TODO this should be based on the selected location,
  we want to know if it's day or night so we can show day/_night
  specific icons */
const isDayTime = hours > 6 && hours < 20;
const dateInfo: any = {
  // stripped down string version of today's date
  today: baseDate.toISOString().slice(0, 10),
  // integer version of current day of the week
  dayOfWeek: baseDate.getDay(),
  // explained above
  isDayTime,
};

const typedArr: any[] = [];

const initialState = {
  fetchedWeather: {},
  fetchedForecast: {},
  /* our cities and their country codes. This is completely
    dynamic and the cities can be changed by changing this array only */
  locations: [
    ["Paris", "FR"],
    ["Calgary", "CA"],
    ["Miami", "US"],
  ],
  // array for fetched geo location data from OpenWeatherMap
  fetchedLocations: typedArr,
  // selected city
  selected: "Calgary",
  /* flag for when network calls are occurring, initialize
    to true to avoid having to setState for initial fetch*/
  fetching: false,
  // flag for when forecast data has been fetched
  loaded: false,
  // flag for when base location data has been fetched
  initialLoad: false,
};

/* Simple function that maps a dateTime integer for
day of the week to an abbrevited text representation */
const getDayOfWeek = (dayNum: number) => {
  if (dayNum === 0) {
    return "Sun";
  }
  if (dayNum === 1) {
    return "Mon";
  }
  if (dayNum === 2) {
    return "Tue";
  }
  if (dayNum === 3) {
    return "Wed";
  }
  if (dayNum === 4) {
    return "Thu";
  }
  if (dayNum === 5) {
    return "Fri";
  }
  if (dayNum === 6) {
    return "Sat";
  }
};

/* We are showing the highest temperature of the day for forecasted
weather conditions. This function uses reduce to  return the forecast
associated with the highest temperature */
const searchForecast = (forecast, joinedDay) => {
  return forecast.list.reduce(
    (acc: any, iter: any) => {
      if (joinedDay === iter.dt_txt.split(" ")[0]) {
        if (acc.main.temp < iter.main.temp) {
          acc = iter;
        }
      }
      return acc;
    },
    { main: { temp: -50 } }
  );
};

/* This function allows us to increment a string in the format
2022-08-05 by a single day which is useful for searching for forecast data */
const incrementDay = (today, dayIncrease) => {
  const splitToday = today.split("-");
  let incrementedDay = Number(splitToday[2]) + dayIncrease;
  incrementedDay =
    incrementedDay < 10 ? "0" + incrementedDay : incrementedDay.toString();
  splitToday[2] = incrementedDay;
  return splitToday.join("-");
};

/* This function increases an integer representing the day of the
day of the week by one. If it is greater than 6 after this incrementation
roll it over to 0, 1, or 2 */
const accountForDayRollover = (dayOfWeek, dayIncrease) => {
  let newDay = dayOfWeek + dayIncrease;
  const testlist = [7, 8, 9, 10, 11, 12];
  testlist.forEach((iter: number, idx: number) => {
    if (newDay === iter) {
      newDay = idx;
    }
  });
  return newDay;
};

export {
  weatherMapper,
  getDayOfWeek,
  searchForecast,
  incrementDay,
  accountForDayRollover,
  initialState,
  dateInfo,
};
