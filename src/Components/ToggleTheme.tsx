import { useTranslation } from "react-i18next";

interface Props {
    value: boolean;
    onChange: (isLight : boolean) => void;
}

export default function ToggleTheme({value, onChange} : Props){
    const { t } = useTranslation();

    return (
        <div className='item'>
            <p>{t("main.theme")}</p>
            <div className="button-group">
            <button className={`button ${value ? "button-active" : ""}`} 
            onClick={() => onChange(true)}
            disabled={value === true}>
                ☀️{t("main.light")}
            </button>
            <button className={`button ${value ? "" : "button-active"}`} 
            onClick={() => onChange(false)}
            disabled={value === false}>
               🌘{t("main.dark")}                
            </button>
            </div>
        </div>
    )
}