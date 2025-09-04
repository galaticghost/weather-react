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
            <p className="temperature">{currentTemperature}°{temperatureUnit === "celsius" ? "C" : "F"}</p>
            <p className="temperature">Sensação Térmica: {apparentTemperature}º{temperatureUnit === "celsius" ? "C" : "F"}</p>
            <TemperatureUnitSelection onClick={onTemperatureUnitChange} />
        </section>
    );
}