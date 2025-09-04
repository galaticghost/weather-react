import type { ChangeEventHandler } from "react";

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

const options: Array<ContinentTimezones> = [
    {
        continent: "América Latina", timezones: [
            { value: "America%2FSao_Paulo", label: "America/São Paulo" },
            { value: "America%2FBuenos_Aires", label: "America/Buenos Aires" },
            { value: "America%2FSantiago", label: "America/Santiago" },
            { value: "America%2FLima", label: "America/Lima" }]
    },
    {
        continent: "América do Norte", timezones: [
            { value: "America%2FNew_York", label: "America/New York" },
            { value: "America%2FChicago", label: "America/Chicago" },
            { value: "America%2FDenver", label: "America/Denver" },
            { value: "America%2FLos_Angeles", label: "America/Los Angeles" },
            { value: "America%2FToronto", label: "America/Toronto" },
            { value: "America%2FVancouver", label: "America/Vancouver" },
            { value: "America%2FMexico_City", label: "America/Mexico City" },]
    },

    {
        continent: "Europa", timezones: [
            { value: "Europe%2FLondon", label: "Europe/London" },
            { value: "Europe%2FParis", label: "Europe/Paris" },
            { value: "Europe%2FBerlin", label: "Europe/Berlin" },
            { value: "Europe%2FMadrid", label: "Europe/Madrid" },
            { value: "Europe%2FRome", label: "Europe/Rome" },
            { value: "Europe%2FMoscow", label: "Europe/Moscow" },]
    },

    {
        continent: "Ásia", timezones: [
            { value: "Asia%2FDubai", label: "Asia/Dubai" },
            { value: "Asia%2FKolkata", label: "Asia/Kolkata" },
            { value: "Asia%2FShanghai", label: "Asia/Shanghai" },
            { value: "Asia%2FTokyo", label: "Asia/Tokyo" },
            { value: "Asia%2FSeoul", label: "Asia/Seoul" },
            { value: "Asia%2FSingapore", label: "Asia/Singapore" },
            { value: "Asia%2FBangkok", label: "Asia/Bangkok" },]
    },

    {
        continent: "Oceania", timezones: [
            { value: "Australia%2FSydney", label: "Australia/Sydney" },
            { value: "Pacific%2FAuckland", label: "Pacific/Auckland" }]
    },

    {
        continent: "África", timezones: [
            { value: "Africa%2FCairo", label: "Africa/Cairo" },
            { value: "Africa%2FJohannesburg", label: "Africa/Johannesburg" },
            { value: "Africa%2FLagos", label: "Africa/Lagos" },
            { value: "Africa%2FNairobi", label: "Africa/Nairobi" },]
    }
];

export default function Timezones({ timezone, onChange }: Props) {
    return (
        <div>
            <label htmlFor="timezones">Fuso horário:</label>
            <select
                name="timezones"
                id="timezones"
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
    )
}