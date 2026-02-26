import windIcon from "../assets/wind.svg";
import dropletIcon from "../assets/droplet.svg";
import rainIcon from "../assets/rain.svg";
import locationIcon from "../assets/location.svg";
import type { Weather } from "../types/types";

interface Props {
    weather: Weather | null;
    temperatureUnit: string;
    city: string;
    country: string;
    isLoading: boolean;
}

export default function MainWeather({ weather, temperatureUnit, city, country,isLoading }: Props) {

    function getCloudCoverDescription(cloudCover: number): string {
        if (cloudCover <= 10) return "Céu limpo";
        if (cloudCover <= 30) return "Pouco nublado";
        if (cloudCover <= 70) return "Parcialmente nublado";
        if (cloudCover <= 90) return "Predominantemente nublado";
        return "Completamente nublado";
    }

    return (
        <section className="main-weather card-surface">
            {!isLoading && weather ?
            <>
                <h2 className="location">
                    <img alt='Ícone de localização' src={locationIcon} className='icon' />
                    {city},{country}
                </h2>
                <div className="division">
                    <div className="temperature">
                        <p className="current-temperature temperature">{weather.temperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
                        <p className="temperature">Sensação Térmica: {weather.apparentTemperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
                        <p>{weather && getCloudCoverDescription(weather.cloudCover)}</p>
                    </div>
                    <div className="second-weather">
                        <span><img alt="Ícone de vento" src={windIcon} className="icon" />Vento: {weather.wind}km/h</span>
                        <span><img alt="Ícone de gota" src={dropletIcon} className="icon" />Umidade: {weather.humidity}%</span>
                        <span><img alt="Ícone de nuvem de chuva" src={rainIcon} className="icon" />Precipitação: {weather.precipitation}%</span>
                    </div>
                </div>
            </> 
            :
            <div className='loader-div'>
                <div className='loader'></div>
                <p>Carregando...</p>
            </div>
            }
        </section>
    );
}