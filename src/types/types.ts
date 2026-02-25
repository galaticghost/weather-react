export type Location = {
    city: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
};

export type Weather = {
    temperature: number;
    apparentTemperature: number;
    precipitation: number;
    humidity: number;
    wind: number;
    cloudCover: number;
}