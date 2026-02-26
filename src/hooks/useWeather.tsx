import { useEffect, useState } from "react";
import type { Location, Weather } from "../types/types";

export function useWeather(location: Location | null, temperatureUnit: string, timezone: string,) {
    const [weather, setWeather] = useState<Weather | null>(null)

    useEffect(() => {
        if (!location?.latitude || !location?.longitude) return;
        const controller = new AbortController();
        (async () => {
            //const d = new Date(); pra depois
            try {
                const url = `https://api.open-meteo.com/v1/forecast?` +
                    `latitude=${location.latitude}` +
                    `&longitude=${location.longitude}` +
                    `&hourly=temperature_2m,apparent_temperature` +
                    `&timezone=${timezone}` +
                    `&forecast_days=1` +
                    `&temperature_unit=${temperatureUnit}` +
                    `&current=temperature_2m,apparent_temperature,` +
                    `cloud_cover,rain,precipitation_probability,wind_speed_10m`;

                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
                const data = await response.json();

                const weather: Weather = {
                    temperature: Math.round(data.current.temperature_2m),
                    apparentTemperature: Math.round(data.current.apparent_temperature),
                    wind: data.current.wind_speed_10m,
                    precipitation: data.current.precipitation_probability,
                    humidity: data.current.rain,
                    cloudCover: data.current.cloud_cover
                };
                setWeather(weather);

            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        })();
        return () => {
            controller.abort("The user has made another request");
        }
    }, [location, timezone, temperatureUnit]);
    return weather;
}