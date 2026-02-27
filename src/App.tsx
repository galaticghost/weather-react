import { useState, useEffect } from 'react';
import { useWeather } from "./hooks/useWeather.tsx";

import Timezones from './Components/Timezones.tsx';
import MainWeather from './Components/MainWeather.tsx';
import SearchLocation from './Components/SearchLocation.tsx';
import TemperatureUnit from './Components/TemperatureUnit.tsx';
import ForecastDays from './Components/ForecastDays.tsx';

import './styles/styles.css';
import './styles/reset.css';
import locationIcon from './assets/location.svg';

import type { Location, WeatherData } from "./types/types";

function App() {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [temperatureUnit, setTemperatureUnit] = useState("celsius");
	const [toggleTheme, setToggleTheme] = useState(false);
	const [location, setLocation] = useState<Location | null>(null);

	const { weather, isLoading }: { weather: WeatherData | null, isLoading: boolean } = 
	useWeather(location, temperatureUnit, timezone);
	
	useEffect(() => {
		setLocationByIp();
	}, []);

	useEffect(() => {
		document.documentElement.dataset.theme =
			toggleTheme ? "light" : "dark";
	}, [toggleTheme]);

	const handleLocationChange = (location: Location) => {
		setLocation(location);
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
			setLocation(location);
		}
	}

	async function getLocationFromIp(): Promise<Location | null> {
		try {
			const response = await fetch("https://ipinfo.io/json")
			if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
			const data = await response.json();

			const [lat, log] = data.loc.split(",");

			const location: Location = {
				city: data.city,
				country: data.country,
				latitude: Number(lat),
				longitude: Number(log)
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
			<section className="location-selector card-surface">
				<SearchLocation setLocation={handleLocationChange} />
				<button className="ip-location" onClick={setLocationByIp}>
					<img alt='Ícone de localização' src={locationIcon} className='icon' />
					Use a minha localização
				</button>
			</section>
			<MainWeather
				temperatureUnit={temperatureUnit}
				weather={weather?.current}
				city={location?.city}
				country={location?.country}
				isLoading={isLoading}
			/>
			<ForecastDays
				forecast={weather?.hourly}
				isLoading={isLoading}
			/>
			<section className='configuration card-surface'>
				<TemperatureUnit temperatureUnit={temperatureUnit} onClick={handleTemperatureUnitChange} />
				<Timezones timezone={timezone} onChange={handleTimezoneChange} />
				<button onClick={() => setToggleTheme(!toggleTheme)}>
					Tema {toggleTheme ? "escuro" : "claro"}
				</button>
			</section>
		</>
	)
}

export default App
