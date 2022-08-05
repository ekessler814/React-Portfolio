import React, { Component } from "react";
import { ForecastWeather, CurrentWeather } from "./WeatherCells";
import "./Weather.css";

const key = "";

class WeatherPanel extends Component<any, any> {
  renderForecast() {
    const { fetchedForecast, dateInfo, fetching, loaded } = this.props;
    const load_or_fetch = fetching || !loaded;

    return (
      <div style={{}} className="weatherRow">
        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={1}
            forecast={fetchedForecast}
            load={load_or_fetch}
          />
        </div>

        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={2}
            forecast={fetchedForecast}
            load={load_or_fetch}
          />
        </div>
        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={3}
            forecast={fetchedForecast}
            load={load_or_fetch}
          />
        </div>
        <div className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={4}
            forecast={fetchedForecast}
            load={load_or_fetch}
          />
        </div>
      </div>
    );
  }
  render() {
    const { fetchedWeather, fetching, loaded, dateInfo } = this.props;
    const load_or_fetch = fetching || !loaded;
    return (
      <div className="weatherPanel">
        <div
          style={{
            ...(!load_or_fetch ? { borderBottom: "5px solid white" } : {}),
          }}
          className="weatherRow"
        >
          <CurrentWeather
            isDayTime={dateInfo.isDayTime}
            fetching={fetching}
            loaded={loaded}
            fetchedWeather={fetchedWeather}
          />
        </div>

        {load_or_fetch ? "" : this.renderForecast()}
      </div>
    );
  }
}

class HeaderRow extends Component<any, any> {
  render() {
    const { onHeaderClick, locations, selected } = this.props;

    const headerSelections = locations.map((loc: string) => {
      const style: any = {};
      if (loc[0] === selected) {
        style.color = "#7CB9E8";
        style.fontWeight = "bold";
      }

      return (
        <div
          className="headerText"
          onClick={() => onHeaderClick(loc[0])}
          style={style}
          key={"header_" + loc}
        >
          {loc[0].toUpperCase()}
        </div>
      );
    });
    return <div className="headerRow">{headerSelections}</div>;
  }
}

class Weather extends Component<any, any> {
  constructor(props: any) {
    super(props);
    const baseDate = new Date();
    const hours = baseDate.getHours();
    const isDayTime = hours > 6 && hours < 20;
    this.state = {
      locations: [
        ["Paris", "Ile-de-France"],
        ["Calgary", "Alberta"],
        ["Miami", "Florida"],
      ],
      fetchedLocations: [],
      selected: "",
      fetching: false,
      loaded: false,
      dateInfo: {
        today: baseDate.toISOString().slice(0, 10),
        dayOfWeek: baseDate.getDay(),
        isDayTime,
      },
    };
  }

  onHeaderClick = (loc: any) => {
    this.setState({
      ...this.state,
      selected: loc,
      fetching: true,
    });

    const found = this.state.fetchedLocations.find((iter: any) => {
      return iter.name === loc;
    });

    const getUrl = (forecast: boolean) => {
      return (
        "https://api.openweathermap.org/data/2.5/" +
        (forecast ? "forecast" : "weather") +
        "?units=" +
        "metric" +
        "&lat=" +
        found.lat +
        "&lon=" +
        found.lon +
        "&appid=" +
        key
      );
    };

    fetch(getUrl(false))
      .then((response) => response.json())
      .then((data) => {
        fetch(getUrl(true))
          .then((inner_response) => inner_response.json())
          .then((inner_data) => {
            this.setState({
              ...this.state,
              fetchedForecast: inner_data,
              fetchedWeather: data,
              fetching: false,
              loaded: true,
            });
          });
      });
  };

  componentDidMount() {
    this.state.locations.forEach((place: string) => {
      const url =
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
        place[0] +
        "&limit=5&appid=" +
        key;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const found = data.find(
            (iter: any) => iter.name === place[0] && iter.state === place[1]
          );
          this.setState({
            ...this.state,
            fetchedLocations: [...this.state.fetchedLocations, found],
          });
        });
    });
  }

  render() {
    const {
      fetchedForecast,
      fetchedWeather,
      fetching,
      loaded,
      dateInfo,
    } = this.state;

    if (!key) {
      return <div style={{padding: '20px'}}>Missing API Key!!!</div>
    }

    return (
      <div
        className="panelContainer"
      >
        <HeaderRow
          selected={this.state.selected}
          locations={this.state.locations}
          onHeaderClick={this.onHeaderClick}
        />
        <WeatherPanel
          dateInfo={dateInfo}
          fetching={fetching}
          loaded={loaded}
          fetchedForecast={fetchedForecast}
          fetchedWeather={fetchedWeather}
        />
      </div>
    );
  }
}
export default Weather;