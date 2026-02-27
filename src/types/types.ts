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

export type ApiWeatherResponse = {
    current: {
        temperature_2m: number,
        apparent_temperature: number,
        wind_speed_10m: number,
        precipitation_probability: number,
        rain: number,
        cloud_cover: number
    };
    hourly: {
        time: string[],
        temperature_2m: number[],
        cloud_cover: number[],
        rain: number[],
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