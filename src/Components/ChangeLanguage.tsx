import { useTranslation } from "react-i18next";
import type { i18n } from "i18next";

interface Props {
    i18n: i18n;
    changeLanguage: (lan: string) => void;
}

export default function ChangeLanguage({i18n, changeLanguage} : Props){
    const { t } = useTranslation();
    return (
        <div className='item'>
            <p>{t("language.language")}</p>
            <div className='button-group'>
                <button className={`button ${i18n.language.startsWith("pt") ? "button-active" : ""}`} onClick={() => changeLanguage('pt')}>
                    PT
                </button>
                <button className={`button ${i18n.language.startsWith("en") ? "button-active" : ""}`} onClick={() => changeLanguage('en')}>
                    EN
                </button>
            </div>
        </div>
    )
}