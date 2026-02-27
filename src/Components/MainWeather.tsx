import windIcon from "../assets/wind.svg";
import dropletIcon from "../assets/droplet.svg";
import rainIcon from "../assets/rain.svg";
import locationIcon from "../assets/location.svg";
import { getCloudCoverDescription } from "../utils/utils";
import type { CurrentWeather } from "../types/types";

interface Props {
    weather: CurrentWeather | null | undefined;
    temperatureUnit: string;
    city: string | undefined;
    country: string | undefined;
    isLoading: boolean;
}

export default function MainWeather({ weather, temperatureUnit, city, country, isLoading }: Props) {
    return (
        <section className="main-weather card-surface">
            {weather && !isLoading ?
                <>  
                    <h2 className="location">
                        <img alt='Ícone de localização' src={locationIcon} className='icon search-icon' />
                        {city},{country}
                    </h2>
                    <div className="division">
                        <div className="temperature">
                            <p className="current-temperature temperature">{weather.temperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
                            <p className="temperature">Sensação Térmica: {weather.apparentTemperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
                            <p className="clouds">{getCloudCoverDescription(weather.cloudCover)}</p>
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