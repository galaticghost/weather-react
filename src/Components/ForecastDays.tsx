// Proxímas temperaturas do dia
// Eu tenho que bolar isso ainda

import type { Weather } from "../types/types";

interface Props {
    weather: Weather | null;
}
export default function ForecastDays({ weather }: Props) {
    return (
        <section className='forecast-days card-surface'>
            {weather ?
                <ul>
                    japa
                </ul>
                :
                <div className='loader-div'>
                    <div className='loader'></div>
                    <p>Carregando...</p>
                </div>
            }</section>
    )
}