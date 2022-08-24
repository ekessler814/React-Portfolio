import "./weather.css";
import _ from 'lodash'
import {
  weatherMapper,
  getDayOfWeek,
  searchForecast,
  incrementDay,
  accountForDayRollover,
} from "../logic";

const ForecastWeather = ({ dayIncrease, forecast, dateInfo }: any) => {
  // don't render unless we have fetched forecast data
  if (!forecast) {
    return <div></div>;
  }

  const { today, dayOfWeek } = dateInfo;

  /* this section increments our current day by one, formats it and grabs
    associated forecast data */
  const joinedDay = incrementDay(today, dayIncrease);
  const noonForecast = searchForecast(forecast, joinedDay);
  const newDay = accountForDayRollover(dayOfWeek, dayIncrease);
  const formattedDay = getDayOfWeek(newDay);

  /* we aren't dealing with the day/night cycle for forecast data
    so we append _day to our icon query. Weather only ever seems
    to contain a single value hence accessing weather[0] */
  const iconComponent = weatherMapper(noonForecast.weather[0].main + "_day");

  return (
    <div className="forecastContainer">
      <div className="dayText">{formattedDay}</div>
      <img
        className="smallWeatherIcon"
        src={iconComponent}
        alt={noonForecast.weather[0].main}
      />
      <div className="smallTempText">
        {/* round our temp to single digit and add degree symbol */}
        {Math.round(noonForecast.main.temp) + "°"}
      </div>
    </div>
  );
};

const CurrentWeather = ({ fetchedWeather, loaded, isDayTime }: any) => {
  // if we don't have weather/forecast data then render simple div
  if (!loaded) {
    return <div className="locationText">Loading...</div>;
  }
  // get icon determined by day/night cycle and weather tyle
  const iconComponent = weatherMapper(
    fetchedWeather.weather[0].main + (isDayTime ? "_day" : "_night")
  );

  return (
    <div className="weatherCell">
      <div className="todayText">{isDayTime ? "Today" : "Tonight"}</div>
      <div className="iconRowWeather">
        <img
          className="mainWeatherIcon"
          src={iconComponent}
          alt={fetchedWeather.weather[0].main}
        />

        <div className="iconColumnWeather">
          <div className="tempText">
            {/* round our temp to single digit and add degree symbol */}
            {Math.round(fetchedWeather.main.temp) + "°"}
          </div>
          <div className="weatherText">{_.first(fetchedWeather.weather).main}</div>
        </div>
      </div>
    </div>
  );
};

export { ForecastWeather, CurrentWeather };
