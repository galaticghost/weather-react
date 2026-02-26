export type Location = {
    city: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
};

//Refazer TODO
export type HourlyForecast = {
    temperature: number;
    hour: string;
    cloudCover: number;
    rain: number;
}

export type CurrentWeather = {
    temperature: number;
    apparentTemperature: number;
    precipitation: number;
    humidity: number;
    wind: number;
    cloudCover: number;
};

export type WeatherData = {
    current: CurrentWeather | null;
    hourly: HourlyForecast[];
}