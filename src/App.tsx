import { useState, useEffect, useRef } from 'react';

import Timezones from './Components/Timezones.tsx';
import MainWeather from './Components/MainWeather.tsx';
import SearchLocation from './Components/SearchLocation.tsx';

import './styles/styles.css';
import './styles/reset.css';

import type { Location } from "./types/types";

function App() {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [temperatureUnit, setTemperatureUnit] = useState("celsius");
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [cloudCover, setCloudCover] = useState("");
	const [apparentTemperature, setApparentTemperature] = useState(0);
	const [temperature, setTemperature] = useState(0);

	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		setLocationByIp();
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

	const handleLocationChange = (location: Location) => {
		setCity(location.city);
		setCountry(location.country);
		setLatitude(location.latitude);
		setLongitude(location.longitude);
	}

	const handleTimezoneChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setTimezone(event.target.value);
	}

	const handleTemperatureUnitChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		setTemperatureUnit(event.currentTarget.value);
	}

	async function setLocationByIp(): Promise<void> {
		const location = await getLocationFromIp();
		if (location) {
			handleLocationChange(location);
		}
	}

	async function getLocationFromIp(): Promise<Location | null> {
		try {
			const response = await fetch("http://ip-api.com/json/")
			if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
			const data = await response.json();

			const location: Location = {
				city: data.city,
				country: data.country,
				latitude: data.lat,
				longitude: data.lon

			};
			return location;

		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
			}
			return null;
		}
	}

	return (
		// TODO CHANGE TITLE
		<>
			<header className="header-title">
				<h1>Weather React</h1>
			</header>
			<section className="location-selector">
				<SearchLocation
					setLocation={handleLocationChange} />
				<button className="" onClick={setLocationByIp}>Use a minha localização</button>
			</section>

			<MainWeather
				temperatureUnit={temperatureUnit}
				currentTemperature={temperature}
				apparentTemperature={apparentTemperature}
				cloudCover={cloudCover}
				onTemperatureUnitChange={handleTemperatureUnitChange}
			/>

		</>
	)
}

/*			<div className="card">
				<MainWeather
					temperatureUnit={temperatureUnit}
					currentTemperature={temperature}
					apparentTemperature={apparentTemperature}
					cloudCover={cloudCover}
					onTemperatureUnitChange={handleTemperatureUnitChange}
				/>
				<Timezones timezone={timezone} onChange={handleTimezoneChange} />
			</div>
*/
export default App
