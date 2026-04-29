import { useState, useEffect } from 'react';
import { useWeather } from "./hooks/useWeather.tsx";

import Timezone from './Components/Timezone.tsx';
import CurrentWeather from './Components/CurrentWeather.tsx';
import SearchBar from './Components/SearchBar.tsx';
import TemperatureUnit from './Components/TemperatureUnit.tsx';
import ForecastDays from './Components/ForecastDays.tsx';

import './styles/styles.css';
import './styles/reset.css';
import locationIcon from './assets/icons/location.svg';

import type { Location, WeatherData } from "./types/types";
import { useCurrentLocation } from './hooks/useCurrentLocation.tsx';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from './Components/ChangeLanguage.tsx';
import ToggleTheme from './Components/ToggleTheme.tsx';

function App() {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [temperatureUnit, setTemperatureUnit] = useState("celsius");
	const [toggleTheme, setToggleTheme] = useState(false);
	const currentLocation = useCurrentLocation();
	const [location, setLocation] = useState<Location | null>(currentLocation);

	const { weather, isLoading }: { weather: WeatherData | null, isLoading: boolean } =
		useWeather(location, timezone);

	const { t, i18n } = useTranslation();
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

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	async function setLocationByIp(): Promise<void> {
		const location = currentLocation;
		if (location) {
			setLocation(location);
		}
	}
	return (
		<>
			<header className="header-title">
				<h1>Weather React</h1>
			</header>

			<section className="location-selector card-surface">
				<SearchBar setLocation={handleLocationChange} />
				<button className="ip-location button" onClick={setLocationByIp}>
					<img alt='Ícone de localização' src={locationIcon} className='icon' />
					{t("main.myLocation")}
				</button>
			</section>

			<CurrentWeather
				temperatureUnit={temperatureUnit}
				weather={weather?.current}
				city={location?.city}
				country={location?.country}
				isLoading={isLoading}
			/>

			<ForecastDays
				forecast={weather?.hourly}
				isLoading={isLoading}
				temperatureUnit={temperatureUnit}
			/>

			<section className='configuration card-surface'>
				<p>{t("main.configurations")}</p>
				<div className='options'>
					<TemperatureUnit temperatureUnit={temperatureUnit} onClick={handleTemperatureUnitChange} />
					<Timezone timezone={timezone} onChange={handleTimezoneChange} />
					<ToggleTheme value={toggleTheme} onChange={setToggleTheme}/>
					<ChangeLanguage language={i18n.language} changeLanguage={changeLanguage} />
				</div>
			</section>

			<footer className='footer'>
				<p>@{new Date().getFullYear()}</p>
			</footer>
		</>
	)
}

export default App
