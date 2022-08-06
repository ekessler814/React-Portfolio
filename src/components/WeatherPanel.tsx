import React, { Component } from "react";
import { ForecastWeather, CurrentWeather } from "./WeatherCells";

// component for rendering inner weather cells
class WeatherPanel extends Component<any, any> {
  /* rendering forecast data is seperated into this function so we can use a
    ternary in the render below to decide to render this section or not.
    The loaded state variable determines if this is rendered which is set
    to true once a city is selected and the forecast data is fetched */
  renderForecast() {
    const { fetchedForecast, dateInfo } = this.props;

    return (
      /* first forecast bubble. We are setting border inline here to avoid
        having to declare a different css class for each. We don't want
        overlapping borders because that does not look good visually */
      <div style={{}} className="weatherRow">
        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            /* each forecast is incremented from 1-4 which determines how many
            days from the current day the forecast represents */
            dayIncrease={1}
            forecast={fetchedForecast}
          />
        </div>
        {/* second forecast bubble */}
        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={2}
            forecast={fetchedForecast}
          />
        </div>
        {/* third forecast bubble */}
        <div style={{ borderRight: "5px solid white" }} className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={3}
            forecast={fetchedForecast}
          />
        </div>
        {/* foursth forecast bubble */}
        <div className="weatherCell">
          <ForecastWeather
            dateInfo={dateInfo}
            dayIncrease={4}
            forecast={fetchedForecast}
          />
        </div>
      </div>
    );
  }

  /* This section renders the panel which contains the current and
  forecasted weather  */
  render() {
    const { fetchedWeather, fetching, loaded, dateInfo } = this.props;
    return (
      <div className="weatherPanel">
        <div
          style={{
            ...(loaded ? { borderBottom: "5px solid white" } : {}),
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
        {/* only render the next section if we have the data fetched */}
        {!loaded ? "" : this.renderForecast()}
      </div>
    );
  }
}

export default WeatherPanel;
