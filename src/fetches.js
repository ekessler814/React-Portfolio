import { useEffect, useState } from "react";
const key = process.env.REACT_APP_WEATHER_API_KEY;

const useHeaderFetch = ({
  fetching,
  fetchedLocations,
  selected,
  setFetch,
}: any) => {
  const [state, setState] = useState({
    fetched: false,
  });
  useEffect(() => {
    if (!fetching || !key) {
      return;
    }
    /* we assume this will pass, the fetched forecast data must
    contain a match to our selected city */
    const found: any = fetchedLocations.find((iter: any) => {
      return iter.name === selected;
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
    ];

    /* use Promise.all to execute our two fetches concurrently */
    Promise.all(promises).then((results: any) => {
      setState({
        fetchedWeather: results[0],
        fetchedForecast: results[1],
        fetched: true,
      });
      setFetch();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching]);

  return state;
};

const useInitialFetch = ({ setLoaded, initialLoad, locations }: any) => {
  const [state, setState] = useState({
    fetched: false,
  });

  useEffect(() => {
    // dont execute fetches without API key
    if (!key || initialLoad) {
      return;
    }

    const promises = locations.map((place: any) => {
      // template strings are an efficient way of building urls!
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${place[0]},${place[1]}&limit=5&appid=${key}`;
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
      setState({
        // initial load is now complete
        fetched: true,
        fetchedLocations,
      });
      setLoaded();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoad]);
  return state;
};

export { useInitialFetch, useHeaderFetch, key };
