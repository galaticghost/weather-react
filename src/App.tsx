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
import { useCurrentLocation } from './hooks/useCurrentLocation.tsx';

function App() {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [temperatureUnit, setTemperatureUnit] = useState("celsius");
	const [toggleTheme, setToggleTheme] = useState(false);
	const currentLocation = useCurrentLocation();
	const [location, setLocation] = useState<Location | null>(currentLocation);

	const { weather, isLoading }: { weather: WeatherData | null, isLoading: boolean } =
		useWeather(location, temperatureUnit, timezone);

	useEffect(() => {
		document.documentElement.dataset.theme =
			toggleTheme ? "light" : "dark";
	}, [toggleTheme]);

	useEffect(() => {
		if (currentLocation) {
			setLocation(currentLocation);
		}
	}, [currentLocation]);

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
		const location = currentLocation;
		if (location) {
			setLocation(location);
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
