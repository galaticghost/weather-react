import { useEffect, useState } from "react";
import type { Location, WeatherData, CurrentWeather, HourlyForecast } from "../types/types";

export function useWeather(location: Location | null, temperatureUnit: string, timezone: string,) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!location?.latitude || !location?.longitude) return;
        const controller = new AbortController();
        (async () => {

            try {
                setIsLoading(true);
                const url = `https://api.open-meteo.com/v1/forecast?` +
                    `latitude=${location.latitude}` +
                    `&longitude=${location.longitude}` +
                    `&hourly=temperature_2m` +
                    `&timezone=${timezone}` +
                    `&forecast_days=1` +
                    `&temperature_unit=${temperatureUnit}` +
                    `&hourly=temperature_2m,cloud_cover,rain` +
                    `&current=temperature_2m,apparent_temperature,` +
                    `cloud_cover,rain,precipitation_probability,wind_speed_10m`;

                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
                const data = await response.json();

                const currentWeather: CurrentWeather = {
                    temperature: Math.round(data.current.temperature_2m),
                    apparentTemperature: Math.round(data.current.apparent_temperature),
                    wind: data.current.wind_speed_10m,
                    precipitation: data.current.precipitation_probability,
                    humidity: data.current.rain,
                    cloudCover: data.current.cloud_cover
                };

                const hourlyForecast: HourlyForecast[] = data.hourly.time.map((_time: string, index: number) => ({
                    hour: data.hourly.time[index].slice(11,16),
                    temperature: data.hourly.temperature_2m[index],
                    cloudCover: data.hourly.cloud_cover[index],
                    rain: data.hourly.rain[index]
                }));

                setWeather({ current: currentWeather, hourly: hourlyForecast });

            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();
        return () => {
            controller.abort("The user has made another request");
        }
    }, [location, timezone, temperatureUnit]);
    return { weather, isLoading };
}