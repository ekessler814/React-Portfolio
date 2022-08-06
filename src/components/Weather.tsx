import React, { Component } from "react";
import WeatherPanel from './WeatherPanel'

const key = process.env.REACT_APP_WEATHER_API_KEY

class HeaderRow extends Component<any, any> {
  render() {
    const { onHeaderClick, locations, selected, loaded } = this.props;

    const headerSelections = locations.map((loc: string) => {
      const style: any = {};
      // loc[0] is the city name
      if (loc[0] === selected) {
        /* TODO use a class for this. Switch color and font
        weight of text to let you know it's selected */
        style.color = "#7CB9E8";
        style.fontWeight = "bold";
      }

      return (
        <div
          className="headerText"
          /* wrap onHeaderClick in arrow function and pass
          the city name so we know which city we're working with */
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
    /* we want the current date so we can determine the days
    of the week and locate the correct forecasted weather for
    that day */
    const baseDate = new Date();
    const hours = baseDate.getHours();
    /* TODO this should be based on the selected location,
    we want to know if it's day or night so we can show day/_night
    specific icons */
    const isDayTime = hours > 6 && hours < 20;

    this.state = {
      /* our cities and their country codes. This is completely
      dynamic and the cities can be changed by changing this array only */
      locations: [
        ["Paris", "FR"],
        ["Calgary", "CA"],
        ["Miami", "US"],
      ],
      // array for fetched geo location data from OpenWeatherMap
      fetchedLocations: [],
      // selected city
      selected: "",
      // flag for when network calls are occurring
      fetching: false,
      // flag for when forecast data has been fetched
      loaded: false,
      // flag for when base location data has been fetched
      initialLoad: false,
      dateInfo: {
        // stripped down string version of today's date
        today: baseDate.toISOString().slice(0, 10),
        // integer version of current day of the week
        dayOfWeek: baseDate.getDay(),
        // explained above
        isDayTime,
      },
    };
  }

  /* this function is for handling clicking a city. We define
  this on the top level class because we are calling setState
  here which should not called by child components when using
  class based React components */
  onHeaderClick = (loaded: any, loc: any) => {
    /* we don't want this action to progress unless forecast data
    is fully fetched */
    if (!loaded) {
      return;
    }
    // update selected city and fetching to true while we fetch
    this.setState({
      ...this.state,
      selected: loc,
      fetching: true,
    });

    /* we assume this will pass, the fetched forecast data must
    contain a match to our selected city */
    const found = this.state.fetchedLocations.find((iter: any) => {
      return iter.name === loc;
    });

    const getUrl = (forecast: boolean) => {
      // template strings are an efficient way of building urls!
      // we query using the metric parameter to get temps in celcius
      return `https://api.openweathermap.org/data/2.5/${
        forecast ? "forecast" : "weather"
      }?units=metric&lat=${found.lat}&lon=${found.lon}&appid=${key}`;
    };

    // array of promises for current and forecast data fetches
    const promises = [
      fetch(getUrl(false)).then((response) => response.json()),
      fetch(getUrl(true)).then((response) => response.json()),
    ]

    /* use Promise.all to execute our two fetches concurrently */
    Promise.all(promises).then((results) => {
      this.setState({
        ...this.state,
        fetchedWeather: results[0],
        fetchedForecast: results[1],
        fetching: false,
        loaded: true,
      });
    });
  };

  componentDidMount() {

    // dont execute fetches without API key
    if (!key) {
      return;
    }

    const promises = this.state.locations.map((place: string) => {
      // template strings are an efficient way of building urls!
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${
        place[0]},${place[1]}&limit=5&appid=${key}`;
      return fetch(url).then((response) => response.json());
    });

    /* use Promise.all to execute our three fetches concurrently */
    Promise.all(promises).then((results) => {
      const fetchedLocations = results.map((data) => {
        /* grab first element since we queried by
        country code this should be specific enough */
        const found = data[0];
        return found;
      });
      /* this setState will not fire until all of our promises are resolved.
      We want to avoid unnecessary calling of setState such as in a loop */
      this.setState({
        ...this.state,
        // initial load is now complete
        initialLoad: true,
        fetchedLocations,
      });
    });
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

    // this condition only fires if we don't have an OpenWeatherMap key defined
    if (!key) {
      // TODO make a style for this
      return <div style={{ padding: "20px" }}>Missing API Key!!!</div>;
    }

    return (
      // this is the outer level container for our app
      <div className="panelContainer">
        {/* city selector row */}
        <HeaderRow
          loaded={initialLoad}
          selected={this.state.selected}
          locations={this.state.locations}
          onHeaderClick={this.onHeaderClick}
        />
        {/* weather cell panel container */}
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
