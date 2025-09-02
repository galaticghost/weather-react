import { useState,useEffect } from 'react';
import WeatherButton from './Components/WeatherButton.tsx';
import Timezones from './Components/Timezones.tsx';
import TemperatureUnit from './Components/TemperatureUnit.tsx';
import './styles/root.css';

function App() {
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
      test()
      if (latitude && longitude && timezone) {
        getWeather();
      }
  }, [timezone,latitude,longitude]);
  const d = new Date();

  function getWeather() {
    const url = `https://api.open-meteo.com/v1/forecast?` +
      `latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&hourly=temperature_2m` +
      `&timezone=${timezone}` +
      `&forecast_days=1` +
      `&temperature_unit=${temperatureUnit}`;
    console.log(latitude + longitude + timezone + temperatureUnit);
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
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
        setLatitude(coords.lat.toString());
        setLongitude(coords.lon.toString());
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  return (
    // TODO CHANGE TITLE
    <>
      <main className="root">
        <div className="card">
          <button onClick={test}>
            count is não funciona
          </button>
          <p>{temperature}°{temperatureUnit === "celsius" ? "C" : "F"}</p>
          <WeatherButton getWeather={getWeather} />
          <Timezones timezone={timezone} onChange={handleTimezoneChange} />
          <TemperatureUnit temperatureUnit={temperatureUnit} onChange={handleTemperatureUnitChange} />
        </div>
      </main>
    </>
  )
}

export default App
