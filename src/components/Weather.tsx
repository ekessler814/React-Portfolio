import WeatherPanel from "./WeatherPanel";
import "./Weather.css";
import { useState, useEffect } from "react";
import { initialState, dateInfo } from "../logic";
import { useHeaderFetch, useInitialFetch, key } from "../fetches";

const HeaderRow = ({ locations, selected, loaded, setLoc }: any) => {
  /* this function is for handling clicking a city. We define
  this on the top level class because we are calling setState
  here which should not called by child components when using
  class based React components */

  const onHeaderClick = (loaded: any, loc: any) => {
    /* we don't want this action to progress unless forecast data
    is fully fetched */
    if (!loaded) {
      return;
    }
    // update selected city and fetching to true while we fetch
    setLoc(loc);
  };

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
};

const Weather = () => {
  const [state, setState] = useState(initialState);

  const { fetched: initialLoad, fetchedLocations }: any = useInitialFetch({
    initialLoad: state.initialLoad,
    locations: state.locations,
    setLoaded: () => {
      setState({
        ...state,
        initialLoad: true,
      });
    },
  });
  useEffect(() => {
    if (!initialLoad) {
      return;
    }
    setState({
      ...state,
      fetching: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoad]);

  const { fetching, selected }: any = state;

  const {
    fetchedWeather,
    fetchedForecast,
    fetched: locationWeatherFetched,
  }: any = useHeaderFetch({
    fetchedLocations,
    fetching,
    selected,
    setFetch: () => {
      setState({
        ...state,
        fetching: false,
      });
    },
  });

  // this condition only fires if we don't have an OpenWeatherMap key defined
  if (!key) {
    // TODO make a style for this
    return <div style={{ padding: "20px" }}>Missing API Key!!!</div>;
  }

  return (
    <div className="panelContainer">
      {/* city selector row */}
      <HeaderRow
        loaded={initialLoad}
        selected={state.selected}
        locations={state.locations}
        setLoc={(loc: string) => {
          setState({
            ...state,
            selected: loc,
            fetching: true,
          });
        }}
      />
      {/* weather cell panel container */}
      <WeatherPanel
        dateInfo={dateInfo}
        fetching={fetching}
        loaded={locationWeatherFetched}
        fetchedForecast={fetchedForecast}
        fetchedWeather={fetchedWeather}
      />
    </div>
  );
};
export default Weather;
