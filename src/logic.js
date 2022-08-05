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

// grab highest temp
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
}

const incrementDay = (today, dayIncrease) => {

      const splitToday = today.split("-");
      let incrementedDay = Number(splitToday[2]) + dayIncrease;
      incrementedDay =
        incrementedDay < 10 ? "0" + incrementedDay : incrementedDay.toString();
      splitToday[2] = incrementedDay;
      return splitToday.join("-");
}

const accountForDayRollover = (dayOfWeek, dayIncrease) => {

  let newDay = dayOfWeek + dayIncrease;
  const testlist = [7, 8, 9];
  testlist.forEach((iter: number, idx: number) => {
    if (newDay === iter) {
      newDay = idx;
    }
  });
  return newDay

}

export { weatherMapper, getDayOfWeek, searchForecast, incrementDay, accountForDayRollover }
