// Proxímas temperaturas do dia
// Eu tenho que bolar isso ainda

import type { HourlyForecast } from "../types/types";

interface Props {
    forecast: HourlyForecast[] | undefined;
    isLoading: boolean;
}
export default function ForecastDays({ forecast, isLoading }: Props) {
    return (
        <section className='forecast-days card-surface'>
            {forecast && !isLoading ?
                <ul className="forecast-list">
                    {forecast.map((weather, index) => (
                        <li className="forecast-item" key={index}>
                            {weather.hour}
                            {weather.temperature}
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