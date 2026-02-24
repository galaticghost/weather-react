import '../styles/temperatureUnit.css';

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    temperatureUnit: string
};

export default function TemperatureUnit({ onClick, temperatureUnit }: Props) {

    return (
        <span className='temperature-unit'>
            <button
                className={`temperature-unit ${temperatureUnit === "celsius" ? "temperature-unit-disable" : ""}`}
                value="celsius"
                onClick={onClick}
                disabled={temperatureUnit === "celsius"}
            >
                ºC
            </button>
            <span> | </span>
            <button
                className={`temperature-unit ${temperatureUnit === "fahrenheit" ? "temperature-unit-disable" : ""}`}
                value="fahrenheit"
                onClick={onClick}
                disabled={temperatureUnit === "fahrenheit"}
            >
                ºF
            </button>
        </span>
    );
}