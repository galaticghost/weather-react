import { useState, useEffect, useRef } from 'react';
import WeatherButton from './Components/WeatherButton.tsx';
import Timezones from './Components/Timezones.tsx';
import './styles/styles.css';
import './styles/reset.css';
import MainWeather from './Components/MainWeather.tsx';
import SearchLocation from './Components/SearchLocation.tsx';

function App() {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [temperatureUnit, setTemperatureUnit] = useState("celsius");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [cloudCover, setCloudCover] = useState("");
	const [apparentTemperature, setApparentTemperature] = useState(0);
	const [temperature, setTemperature] = useState(0);

	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		getCoordsFromIp();
	}, []);

	useEffect(() => {
		if (latitude && longitude) {
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
			`&hourly=temperature_2m,apparent_temperature` +
			`&timezone=${timezone}` +
			`&forecast_days=1` +
			`&temperature_unit=${temperatureUnit}` +
			`&current=temperature_2m,apparent_temperature,cloud_cover`;
		const d = new Date();

		try {
			const response = await fetch(url, { signal });
			if (!response.ok) { throw new Error(`Response status: ${response.status}`); }

			const data = await response.json();
			console.log(data); // Deletar dps

			const cloudCover: number = data.current.cloud_cover;
			setTemperature(data.hourly.temperature_2m[d.getHours()]);
			setApparentTemperature(data.hourly.apparent_temperature[d.getHours()]);

			if (cloudCover <= 10) {
				setCloudCover("Céu limpo");
			} else if (cloudCover > 10 && cloudCover <= 30) {
				setCloudCover("Pouco nublado");
			} else if (cloudCover > 30 && cloudCover <= 70) {
				setCloudCover("Parcialmente nublado");
			} else if (cloudCover > 70 && cloudCover <= 90) {
				setCloudCover("Predominantemente nublado");
			} else {
				setCloudCover("Completamente nublado");
			}

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

	const handleTemperatureUnitChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		setTemperatureUnit(event.currentTarget.value);
	}

	async function getCoordsFromIp() {
		try {
			const response = await fetch("http://ip-api.com/json/")
			if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
			const { lat, lon, city, country } = await response.json();
			console.log(lat, lon, city, country); // deletar dps
			setLatitude(lat);
			setLongitude(lon);
			setCity(city);
			setCountry(country);

		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	return (
		// TODO CHANGE TITLE
		<>
			<div className="card">
				<SearchLocation />
				<MainWeather
					temperatureUnit={temperatureUnit}
					currentTemperature={temperature}
					apparentTemperature={apparentTemperature}
					cloudCover={cloudCover}
					onTemperatureUnitChange={handleTemperatureUnitChange}
				/>
				<WeatherButton getWeather={getWeather} />
				<Timezones timezone={timezone} onChange={handleTimezoneChange} />
			</div>
		</>
	)
}

export default App
