import React, { Component } from "react";
import "./Weather.css";
import {
  weatherMapper,
  getDayOfWeek,
  searchForecast,
  incrementDay,
  accountForDayRollover,
} from "../logic";

class ForecastWeather extends Component<any, any> {
  render() {
    const { dayIncrease, forecast, load, dateInfo } = this.props;
    const { today, dayOfWeek } = dateInfo;

    if (load || !forecast) {
      return;
    }

    const joinedDay = incrementDay(today, dayIncrease);
    const noonForecast = searchForecast(forecast, joinedDay);
    const newDay = accountForDayRollover(dayOfWeek, dayIncrease);
    const formattedDay = getDayOfWeek(newDay);

    const iconComponent = weatherMapper(noonForecast.weather[0].main + "_day");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="dayText">{formattedDay}</div>
        <img
          className="smallWeatherIcon"
          src={iconComponent}
          alt={noonForecast.weather[0].main}
        />
        <div className="smallTempText">
          {Math.round(noonForecast.main.temp) + "°"}
        </div>
      </div>
    );
  }
}

class CurrentWeather extends Component<any, any> {
  render() {
    const { fetchedWeather, fetching, loaded, isDayTime } = this.props;

    if (fetching) {
      return <div className="todayText">Loading...</div>;
    }

    if (!loaded) {
      return <div className="locationText">Select Location</div>;
    }

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
              {Math.round(fetchedWeather.main.temp) + "°"}
            </div>
            <div className="weatherText">{fetchedWeather.weather[0].main}</div>
          </div>
        </div>
      </div>
    );
  }
}

export { ForecastWeather, CurrentWeather };
