import { useTranslation } from "react-i18next";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    temperatureUnit: string
};

export default function TemperatureUnit({ onClick, temperatureUnit }: Props) {
    const {t} = useTranslation();
    return (
        <div className='item'>
            <p>{t("temperatureUnit.temperatureUnit")}</p>
            <div className='button-group'>
                <button
                    className={`button ${temperatureUnit === "celsius" ? "button-active" : ""}`}
                    value="celsius"
                    onClick={onClick}
                    disabled={temperatureUnit === "celsius"}
                >
                    ºC
                </button>
                <button
                    className={`button ${temperatureUnit === "fahrenheit" ? "button-active" : ""}`}
                    value="fahrenheit"
                    onClick={onClick}
                    disabled={temperatureUnit === "fahrenheit"}
                >
                    ºF
                </button>
            </div>
        </div>
    );
}