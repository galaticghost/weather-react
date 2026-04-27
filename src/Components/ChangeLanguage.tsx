import { useTranslation } from "react-i18next";

interface Props {
    language: string;
    changeLanguage: (lan: string) => void;
}

export default function ChangeLanguage({language, changeLanguage} : Props){
    const { t } = useTranslation();
    return (
        <div className='item'>
            <p>{t("language.language")}</p>
            <div className='button-group'>
                <button className={`button ${language === "pt" ? "button-active" : ""}`} onClick={() => changeLanguage('pt')}>
                    PT
                </button>
                <button className={`button ${language === "en" ? "button-active" : ""}`} onClick={() => changeLanguage('en')}>
                    EN
                </button>
            </div>
        </div>
    )
}