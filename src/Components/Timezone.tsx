import type { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import "../styles/timezone.css";

interface ContinentTimezones {
    continent: string,
    timezones: Array<Timezone>
}

interface Timezone {
    value: string,
    label: string
}

interface Props {
    timezone: string;
    onChange: (ChangeEventHandler<HTMLSelectElement>);
}
export default function Timezones({ timezone, onChange }: Props) {
    const { t } = useTranslation();

    const options: Array<ContinentTimezones> = [
        {
            continent: t("timezone.latinAmerica"), timezones: [
                { value: "America%2FSao_Paulo", label: "São Paulo" },
                { value: "America%2FBuenos_Aires", label: "Buenos Aires" },
                { value: "America%2FSantiago", label: "Santiago" },
                { value: "America%2FLima", label: "Lima" },
                { value: "America%2FMexico_City", label: "Mexico City" },]
        },
        {
            continent: t("timezone.northAmerica"), timezones: [
                { value: "America%2FNew_York", label: "New York" },
                { value: "America%2FChicago", label: "Chicago" },
                { value: "America%2FDenver", label: "Denver" },
                { value: "America%2FLos_Angeles", label: "Los Angeles" },
                { value: "America%2FToronto", label: "Toronto" },
                { value: "America%2FVancouver", label: "Vancouver" },
                ]
        },

        {
            continent: t("timezone.europe"), timezones: [
                { value: "Europe%2FLondon", label: "London" },
                { value: "Europe%2FParis", label: "Paris" },
                { value: "Europe%2FBerlin", label: "Berlin" },
                { value: "Europe%2FMadrid", label: "Madrid" },
                { value: "Europe%2FRome", label: "Rome" },
                { value: "Europe%2FMoscow", label: "Moscow" },]
        },

        {
            continent: t("timezone.asia"), timezones: [
                { value: "Asia%2FDubai", label: "Dubai" },
                { value: "Asia%2FKolkata", label: "Kolkata" },
                { value: "Asia%2FShanghai", label: "Shanghai" },
                { value: "Asia%2FTokyo", label: "Tokyo" },
                { value: "Asia%2FSeoul", label: "Seoul" },
                { value: "Asia%2FSingapore", label: "Singapore" },
                { value: "Asia%2FBangkok", label: "Bangkok" },]
        },

        {
            continent: t("timezone.oceania"), timezones: [
                { value: "Australia%2FSydney", label: "Sydney" },
                { value: "Pacific%2FAuckland", label: "Auckland" }]
        },

        {
            continent: t("timezone.africa"), timezones: [
                { value: "Africa%2FCairo", label: "Cairo" },
                { value: "Africa%2FJohannesburg", label: "Johannesburg" },
                { value: "Africa%2FLagos", label: "Lagos" },
                { value: "Africa%2FNairobi", label: "Nairobi" },]
        }
    ];

    return (
        <div className="item">
            <p>{t("timezone.timezone")}</p>
            <div className="timezone-wrapper">
                <select
                    name="timezones"
                    id="timezones"
                    className="timezone-select"
                    value={timezone}
                    onChange={onChange}
                >
                    {options.map((optgroup: ContinentTimezones) => (
                        <optgroup key={optgroup.continent} label={optgroup.continent}>{
                            optgroup.timezones.map((option: Timezone) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        }</optgroup>
                    ))}
                </select>
            </div>
        </div>
    )
}