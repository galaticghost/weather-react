import type { ApiWeatherResponse, Location } from "../types/types";

export async function getWeather(location: Location, timezone: string,
    temperatureUnit: string, controller: AbortController): Promise<ApiWeatherResponse | null> {
    try {
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

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return null;
    }
}