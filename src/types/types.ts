export type Location = {
    city: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
};
// DELETAR WEATHER DPS TODO
export type Weather = {
    temperature: number;
    apparentTemperature: number;
    precipitation: number;
    humidity: number;
    wind: number;
    cloudCover: number;
}
//Refazer TODO
export type HourlyForecast = {
    temperature: number;
    hour: number;
    cloudCover: number;
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
    current: CurrentWeather;
    hourly: HourlyForecast;
}