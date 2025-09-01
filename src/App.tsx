import { useState } from 'react';
import WeatherButton from './Components/WeatherButton.tsx';
import Timezones from './Components/Timezones.tsx';
import TemperatureUnit from './Components/TemperatureUnit.tsx';

function App() {
  const [timezone, setTimezone] = useState("America%2FSao_Paulo");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [temperature, setTemperature] = useState(0);
  const d = new Date();

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
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setTemperature(data.hourly.temperature_2m[d.getHours()])
      })
      .catch((error: Error) => { console.error(error.message) });
  }

  const handleTimezoneChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(event.target.value);
  }

  const handleTemperatureUnitChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTemperatureUnit(event.target.value);
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

  function test() {
    fetch("http://ip-api.com/json/")
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
    // TODO CHANGE TITLE
    <>
      <div className="card">
        <button onClick={test}>
          count is não funciona
        </button>
        <p>{temperature}°{temperatureUnit === "celsius" ? "C" : "F"}</p>
        <WeatherButton getWeather={getWeather} />
        <Timezones timezone={timezone} onChange={handleTimezoneChange} />
        <TemperatureUnit temperatureUnit={temperatureUnit} onChange={handleTemperatureUnitChange} />
      </div>
    </>
  )
}

export default App
