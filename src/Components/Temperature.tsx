import TemperatureUnitSelection from "./TemperatureUnit";

interface Props {
    currentTemperature: number,
    apparentTemperature: number,
    temperatureUnit: string,
    onTemperatureUnitChange: React.MouseEventHandler<HTMLButtonElement>
};

export default function Temperature({ currentTemperature, apparentTemperature, temperatureUnit, onTemperatureUnitChange }: Props) {
    return (
        <section>
            <p className="current-temperature temperature">{currentTemperature} <TemperatureUnitSelection onClick={onTemperatureUnitChange} temperatureUnit={temperatureUnit} /></p>
            <p className="temperature">Sensação Térmica: {apparentTemperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
        </section>
    );
}