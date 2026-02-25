import windIcon from "../assets/wind.svg";
import dropletIcon from "../assets/droplet.svg";
import rainIcon from "../assets/rain.svg";
import locationIcon from "../assets/location.svg";

interface Props {
    currentTemperature: number;
    apparentTemperature: number;
    temperatureUnit: string;
    cloudCover: string;
    city: string,
    country: string,
    wind: number,
    humidity: number,
    precipitation: number
}

export default function MainWeather({ currentTemperature, apparentTemperature, temperatureUnit,
    cloudCover, city, country, wind, humidity, precipitation }: Props) {
    return (
        <section className="main-weather card-surface">
            <h2 className="location">
                <img alt='Ícone de localização' src={locationIcon} className='icon' />
                {city},{country}
            </h2>
            <div className="division">
                <div className="temperature">
                    <p className="current-temperature temperature">{currentTemperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
                    <p className="temperature">Sensação Térmica: {apparentTemperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
                    <p>{cloudCover}</p>
                </div>
                <div className="second-weather">
                    <span><img alt="Ícone de vento" src={windIcon} className="icon" />Vento: {wind}km/h</span>
                    <span><img alt="Ícone de gota" src={dropletIcon} className="icon" />Umidade: {humidity}%</span>
                    <span><img alt="Ícone de nuvem de chuva" src={rainIcon} className="icon" />Precipitação: {precipitation}%</span>
                </div>
            </div>
        </section>
    );
}