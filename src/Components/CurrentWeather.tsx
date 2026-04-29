import locationIcon from "../assets/icons/location.svg";
import { getCloudCoverDescription, formatTemp, getHours, getWeatherImage } from "../utils/utils";
import type { CurrentWeather } from "../types/types";
import { useTranslation } from "react-i18next";
import "../styles/currentWeather.css";

interface Props {
    weather: CurrentWeather | null | undefined;
    temperatureUnit: string;
    city: string | undefined;
    country: string | undefined;
    isLoading: boolean;
}

export default function MainWeather({ weather, temperatureUnit, city, country, isLoading }: Props) {
    const { t } = useTranslation();
    return (
        <section className="current-weather card-surface">
            {weather && !isLoading ?
                <>
                    <h2 className="location">
                        <img alt='Ícone de localização' src={locationIcon} className='icon search-icon' />
                        {city}, {country}
                    </h2>
                    <div className="temperature">
                        <div className="current-temperature-details">
                        <p className="current-temperature">{formatTemp(weather.temperature, temperatureUnit)}º{temperatureUnit === "celsius" ? "C" : "F"}</p>

                        <p className="apparent-temperature">🌡️{t('currentWeather.apparentTemperature')}:
                            {formatTemp(weather.apparentTemperature, temperatureUnit)}º{temperatureUnit === "celsius" ? "C" : "F"}</p>

                        <p className="cloud-cover">{t(getCloudCoverDescription(weather.cloudCover))}</p>
                        </div>
                        <img className="weather-image" src={getWeatherImage(getHours(weather.time),weather.cloudCover,10,true)} />
                    </div>
                    <div className="weather-details">
                        <div className="weather-row">
                            <span>🍃 {t("currentWeather.wind")}:</span>
                            <span>{weather.wind}km/h</span>
                        </div>
                        <div className="weather-row">
                            <span>💧 {t("currentWeather.humidity")}:</span>
                            <span>{weather.humidity}%</span>
                        </div>
                        <div className="weather-row">
                            <span>🌧️ {t("currentWeather.precipitation")}:</span>
                            <span>{weather.precipitation} mm</span>
                        </div>
                    </div>
                </>
                :
                <div className='loader-div'>
                    <div className='loader'></div>
                    <p>{t("loading")}</p>
                </div>
            }
        </section>
    );
}