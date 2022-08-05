import React, { Component } from "react";
import { ForecastWeather, CurrentWeather } from "./WeatherCells";
import "./Weather.css";

const key = process.env.REACT_APP_WEATHER_API_KEY

class WeatherPanel extends Component<any, any> {
  renderForecast() {
    const { fetchedForecast, dateInfo } = this.props;

    return (
      <div style={{}} className="weatherRow">
        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={1}
            forecast={fetchedForecast}
            load={false}
          />
        </div>

        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={2}
            forecast={fetchedForecast}
            load={false}
          />
        </div>
        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={3}
            forecast={fetchedForecast}
            load={false}
          />
        </div>
        <div className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={4}
            forecast={fetchedForecast}
            load={false}
          />
        </div>
      </div>
    );
  }
  render() {
    const { fetchedWeather, fetching, loaded, dateInfo } = this.props;
    return (
      <div className="weatherPanel">
        <div
          style={{
            ...(loaded? { borderBottom: "5px solid white" } : {}),
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

        {!loaded ? "" : this.renderForecast()}
      </div>
    );
  }
}

class HeaderRow extends Component<any, any> {
  render() {
    const { onHeaderClick, locations, selected, loaded } = this.props;

    const headerSelections = locations.map((loc: string) => {
      const style: any = {};
      if (loc[0] === selected) {
        style.color = "#7CB9E8";
        style.fontWeight = "bold";
      }

      return (
        <div
          className="headerText"
          onClick={() => onHeaderClick(loaded, loc[0])}
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
        ["Paris", "FR"],
        ["Calgary", "CA"],
        ["Miami", "US"],
      ],
      fetchedLocations: [],
      selected: "",
      fetching: false,
      loaded: false,
      initialLoad: 0,
      dateInfo: {
        today: baseDate.toISOString().slice(0, 10),
        dayOfWeek: baseDate.getDay(),
        isDayTime,
      },
    };
  }

  onHeaderClick = (loaded: any, loc: any) => {

    if (!loaded) {
      return
    }
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
    if (!key) {
      return
    }

    const promises = this.state.locations.map((place: string) => {
      const url =
        "https://api.openweathermap.org/geo/1.0/direct?q=" +
        place[0] +
        ',' + place[1] +
        "&limit=5&appid=" +
        key;

      return fetch(url)
        .then((response) => response.json())

    })



    Promise.all(promises).then(results => {
      const fetchedLocations = results.map((data) => {

            // grab first element since we queried by country code
            const found = data[0]
            return found
      })
      this.setState({
        ...this.state,
        initialLoad: true,
        fetchedLocations,
      });
    })



  }

  render() {
    const {
      fetchedForecast,
      fetchedWeather,
      fetching,
      initialLoad,
      dateInfo,
      loaded,
    } = this.state;

    if (!key) {
      return <div style={{padding: '20px'}}>Missing API Key!!!</div>
    }

    return (
      <div
        className="panelContainer"
      >
        <HeaderRow
          loaded={initialLoad}
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
