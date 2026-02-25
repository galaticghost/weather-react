import { useState, useEffect, useRef } from 'react';

import Timezones from './Components/Timezones.tsx';
import MainWeather from './Components/MainWeather.tsx';
import SearchLocation from './Components/SearchLocation.tsx';
import TemperatureUnit from './Components/TemperatureUnit.tsx';

import './styles/styles.css';
import './styles/reset.css';
import locationIcon from './assets/location.svg';

import type { Location, Weather } from "./types/types";

function App() {
	const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
	const [temperatureUnit, setTemperatureUnit] = useState("celsius");
	const [toggleTheme, setToggleTheme] = useState(false);
	const [weather, setWeather] = useState<Weather | null>(null)
	const [isLoading, setIsLoading] = useState(true);
	const [location, setLocation] = useState<Location>({
		city: "",
		country: "",
		latitude: null,
		longitude: null
	});

	const abortRef = useRef<AbortController | null>(null);

	useEffect(() => {
		setLocationByIp();
	}, []);

	useEffect(() => {
		if (location.latitude !== null && location.longitude !== null) {
			getWeather();
		}
	}, [timezone, location.latitude, location.longitude, temperatureUnit]);

	if (toggleTheme) { // Vejo depois melhor
		document.documentElement.dataset.theme = "light";
	} else {
		document.documentElement.dataset.theme = "dark";
	}

	async function getWeather() {
		if (abortRef.current) {
			abortRef.current.abort("The user has made another request");
		}
		const controller = new AbortController();
		abortRef.current = controller;
		const signal = abortRef.current.signal;

		const url = `https://api.open-meteo.com/v1/forecast?` +
			`latitude=${location.latitude}` +
			`&longitude=${location.longitude}` +
			`&hourly=temperature_2m,apparent_temperature` +
			`&timezone=${timezone}` +
			`&forecast_days=1` +
			`&temperature_unit=${temperatureUnit}` +
			`&current=temperature_2m,apparent_temperature,` +
			`cloud_cover,rain,precipitation_probability,wind_speed_10m`;
		const d = new Date();

		try {
			const response = await fetch(url, { signal });
			if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
			const data = await response.json();

			setWeather({
				temperature: data.hourly.temperature_2m[d.getHours()],
				apparentTemperature: data.hourly.apparent_temperature[d.getHours()],
				wind: data.current.wind_speed_10m,
				precipitation: data.current.precipitation_probability,
				humidity: data.current.rain,
				cloudCover: data.current.cloud_cover
			});

		} catch (error: unknown) {
			if (signal.reason) {
				console.error(signal.reason);
			}
			if (error instanceof Error) {
				console.error(error.message);
			}
		} finally {
			setIsLoading(false);
		}
	}

	const handleLocationChange = (location: Location) => {
		setIsLoading(true);
		setLocation(location);
	}

	const handleTimezoneChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setTimezone(event.target.value);
	}

	const handleTemperatureUnitChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		setTemperatureUnit(event.currentTarget.value);
	}

	async function setLocationByIp(): Promise<void> {
		setIsLoading(true);
		const location = await getLocationFromIp();
		if (location) {
			handleLocationChange(location);
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
		// TODO CHANGE TITLE AND ICON
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
			{!isLoading && weather ?
				<>
					<MainWeather
						temperatureUnit={temperatureUnit}
						weather={weather}
						city={location.city}
						country={location.country}
					/>
					<section className='forecast-days card-surface'>Teste</section>
					<section className='configuration card-surface'>
						<TemperatureUnit temperatureUnit={temperatureUnit} onClick={handleTemperatureUnitChange} />
						<Timezones timezone={timezone} onChange={handleTimezoneChange} />
						<button onClick={() => setToggleTheme(!toggleTheme)}>
							Tema {toggleTheme ? "escuro" : "claro"}
						</button>
					</section>
				</>
				:
				<div className='loader-div'>
					<div className='loader'></div>
					<p>Carregando...</p>
				</div>
			}
		</>
	)
}

export default App

/**/