import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import WeatherButton from './Components/WeatherButton.tsx';
import Timezones from './Components/Timezones.tsx';
import TemperatureUnit from './Components/TemperatureUnit.tsx';

function App() {
  const [timezone, setTimezone] = useState("America%2FSao_Paulo");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function getWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&hourly=temperature_2m` +
      `&timezone=${timezone}` +
      `&forecast_days=1` +
      `&temperature_unit=${temperatureUnit}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json()
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error: unknown) => {
        let errorMessage = "Something went wrong";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        console.error(errorMessage);
      })
  }

  const handleTimezoneChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(event.target.value);
    console.log(timezone);
  }

  const handleTemperatureUnitChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTemperatureUnit(event.target.value);
    console.log(event.target.value);
  }

  function success(pos: GeolocationPosition) {
    const cord: GeolocationCoordinates = pos.coords;
    setLatitude(cord.latitude.toString());
    setLongitude(cord.longitude.toString());
  }

  function error(err: GeolocationPositionError) {
    //test();
    if (err instanceof Error) {
      console.warn(`ERROR: ${err.message}`);
    }
  }

  async function test() {
    await fetch("http://ip-api.com/json/")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then(coords => {
        console.log(coords);
        setLatitude(coords.lat.toString());
        setLongitude(coords.lon.toString());
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, error, { timeout: 1000 });
  } else {
    console.log("nao tem"); // TODO
  }

  return (

    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={test}>
          count is não funciona
        </button>
        <WeatherButton getWeather={getWeather} />
        <Timezones timezone={timezone} onChange={handleTimezoneChange} />
        <TemperatureUnit temperatureUnit={temperatureUnit} onChange={handleTemperatureUnitChange} />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
