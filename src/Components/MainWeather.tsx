import TemperatureUnitSelection from "./TemperatureUnit";

interface Props {
    currentTemperature: number;
    apparentTemperature: number;
    temperatureUnit: string;
    cloudCover: string;
    onTemperatureUnitChange: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MainWeather({ currentTemperature, apparentTemperature, temperatureUnit, cloudCover, onTemperatureUnitChange }: Props) {
    return (
        <section>
            <p className="current-temperature temperature">{currentTemperature} <TemperatureUnitSelection onClick={onTemperatureUnitChange} temperatureUnit={temperatureUnit} /></p>
            <p className="temperature">Sensação Térmica: {apparentTemperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
            <p>{cloudCover}</p>
        </section>
    );
}