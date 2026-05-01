export type Location = {
    city: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
};

export type HourlyForecast = {
    rain: number;
    temperature: number;
    time: string;
    cloudCover: number;
    precipitation_probability: number;
}

export type CurrentWeather = {
    time: string,
    temperature: number;
    apparentTemperature: number;
    precipitation: number;
    humidity: number;
    wind: number;
    cloudCover: number;
};

export type WeatherData = {
    current: CurrentWeather;
    hourly: HourlyForecast[];
}

export type ApiWeatherResponse = {
    current: {
        time: string,
        temperature_2m: number,
        apparent_temperature: number,
        wind_speed_10m: number,
        precipitation_probability: number,
        rain: number,
        cloud_cover: number
    };
    hourly: {
        time: string[],
        rain: number[]
        temperature_2m: number[],
        cloud_cover: number[],
        precipitation_probability: number[],
    };
}

export type LocationIp = {
    city: string;
    country: string;
    loc: string;
}

export type LocationQuery = {
    properties: {
        name: string,
        country: string
    };
    geometry: {
        coordinates: string[]
    }
}