import type { HourlyForecast } from "../types/types";
import { getCloudCoverDescription } from "../utils/utils";

interface Props {
    forecast: HourlyForecast[] | undefined;
    isLoading: boolean;
}
//Mudar o texto de forecast
export default function ForecastDays({ forecast, isLoading }: Props) {
    return (
        <section className='forecast-days card-surface'>
            <h2 className="location">24 Forecast</h2>
            {forecast && !isLoading ?
                <ul className="forecast-list">
                    {forecast.map((weather, index) => (
                        <li className="forecast-item" key={index}>
                            <span>{weather.hour}</span>
                            <span className="forecast-temperature">{weather.temperature}</span>
                            <span>{getCloudCoverDescription(weather.cloudCover)}</span>
                        </li>
                    ))}
                </ul>
                :
                <div className='loader-div'>
                    <div className='loader'></div>
                    <p>Carregando...</p>
                </div>
            }</section>
    )
}