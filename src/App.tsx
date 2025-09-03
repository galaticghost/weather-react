import { useState, useEffect, useRef } from 'react';
import WeatherButton from './Components/WeatherButton.tsx';
import Timezones from './Components/Timezones.tsx';
import TemperatureUnit from './Components/TemperatureUnit.tsx';
import './styles/styles.css';

function App() {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [temperatureUnit, setTemperatureUnit] = useState("celsius");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [temperature, setTemperature] = useState(0);

	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		getCoords();
	}, []);

	useEffect(() => {
		if (latitude && longitude && timezone) {
			getWeather();
		}

	}, [timezone, latitude, longitude, temperatureUnit]);

	async function getWeather() {
		if (abortRef.current) {
			abortRef.current.abort("The user has made another request");
		}

		const controller = new AbortController();
		abortRef.current = controller;
		const signal = abortRef.current.signal;

		const url = `https://api.open-meteo.com/v1/forecast?` +
			`latitude=${latitude}` +
			`&longitude=${longitude}` +
			`&hourly=temperature_2m` +
			`&timezone=${timezone}` +
			`&forecast_days=1` +
			`&temperature_unit=${temperatureUnit}`;
		const d = new Date();

		try {
			const response = await fetch(url, { signal });
			if (!response.ok) { throw new Error(`Response status: ${response.status}`); }

			const data = await response.json();
			setTemperature(data.hourly.temperature_2m[d.getHours()]);

		} catch (error: unknown) {
			if (signal.reason) {
				console.error(signal.reason);
			}
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}

	const handleTimezoneChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setTimezone(event.target.value);
	}

	const handleTemperatureUnitChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setTemperatureUnit(event.target.value);
	}

	function getCoords() {
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

	return (
		// TODO CHANGE TITLE
		<>
			<div className="card">
				<p className="temperature">{temperature}°{temperatureUnit === "celsius" ? "C" : "F"}</p>
				<WeatherButton getWeather={getWeather} />
				<Timezones timezone={timezone} onChange={handleTimezoneChange} />
				<TemperatureUnit temperatureUnit={temperatureUnit} onChange={handleTemperatureUnitChange} />
			</div>
		</>
	)
}

export default App
