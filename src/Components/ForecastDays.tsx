import { getCloudCoverDescription, getWeatherImage, getHours, formatTemp, formatHour } from "../utils/utils";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import "../styles/forecastDays.css";
import type { HourlyForecast } from "../types/types";

interface Props {
    forecast: HourlyForecast[] | undefined;
    isLoading: boolean;
    temperatureUnit: string;
}

export default function ForecastDays({ forecast, isLoading, temperatureUnit }: Props) {
    const scrollRef = useRef<HTMLUListElement>(null);
    const { t } = useTranslation();
    
    function scroll(direction: number) {
        scrollRef.current?.scrollBy({
            left: 320 * direction,
            behavior: "smooth"
        });
    }
    return (
        <section className='forecast-days card-surface'>
            <h2 className="location">{t("forecast.forecast")}</h2>
            {forecast && !isLoading ?
                <div className="forecast-container">
                    <button
                        className="scroll-button left"
                        onClick={() => scroll(-1)}
                    >
                        &lt;
                    </button>
                    <ul className="forecast-list" ref={scrollRef} >
                        {forecast.map((weather, index) => (
                            <li className="forecast-item" key={index}>
                                <span>{formatHour(weather.time)}</span>
                                <span><img className="weather-image" src={getWeatherImage(getHours(weather.time),weather.cloudCover,weather.rain)}/></span>
                                <span className="forecast-temperature">{formatTemp(weather.temperature, temperatureUnit)}º{temperatureUnit === "celsius" ? "C" : "F"}</span>
                                <span>{t("forecast.rainChance")} {weather.precipitation_probability}%</span>
                                <span className="forecast-cloud-cover">{t(getCloudCoverDescription(weather.cloudCover))}</span>
                            </li>
                        ))}

                    </ul>
                    <button
                        className="scroll-button right"
                        onClick={() => scroll(1)}
                    >
                        &gt;
                    </button>
                </div>
                :
                <div className='loader-div'>
                    <div className='loader'></div>
                    <p>{t("loading")}</p>
                </div>
            }</section>
    )
}