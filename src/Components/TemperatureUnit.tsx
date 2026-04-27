import { useTranslation } from "react-i18next";

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    temperatureUnit: string
};

export default function TemperatureUnit({ onClick, temperatureUnit }: Props) {
    const {t} = useTranslation();

    return (
        <div className='temperature-unit item'>
            <p>{t("temperatureUnit.temperatureUnit")}</p>
            <div className='button-group'>
                <button
                    className={`button`}
                    value="celsius"
                    onClick={onClick}
                    disabled={temperatureUnit === "celsius"}
                >
                    ºC
                </button>
                <button
                    className={`button`}
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