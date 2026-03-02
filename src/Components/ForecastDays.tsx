import { useRef } from "react";
import type { HourlyForecast } from "../types/types";
import { getCloudCoverDescription } from "../utils/utils";

interface Props {
    forecast: HourlyForecast[] | undefined;
    isLoading: boolean;
    temperatureUnit: string;
}
//Mudar o texto de forecast
export default function ForecastDays({ forecast, isLoading, temperatureUnit }: Props) {
    const scrollRef = useRef<HTMLUListElement>(null);

    function scroll(direction: number) {
        scrollRef.current?.scrollBy({
            left: 320 * direction,
            behavior: "smooth"
        });
    }
    return (
        <section className='forecast-days card-surface'>
            <h2 className="location">Previsão do Tempo</h2>
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
                                <span>{weather.hour}</span>
                                <span className="forecast-temperature">{weather.temperature}º{temperatureUnit === "celsius" ? "C" : "F"}</span>
                                <span>Chuva {weather.precipitation_probability}%,</span>
                                <span>{getCloudCoverDescription(weather.cloudCover)}</span>
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
                    <p>Carregando...</p>
                </div>
            }</section>
    )
}