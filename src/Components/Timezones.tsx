import type { ChangeEventHandler } from "react";

interface Timezones {
    value: string,
    label: string
}

interface Props {
    timezone: string;
    onChange: (ChangeEventHandler<HTMLSelectElement>);
}

const options: Array<Timezones> = [
    { value: "America%2FLos_Angeles", label: "America/Los Angeles" },
    { value: "America%2FSao_Paulo", label: "America/São Paulo" }
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
                {options.map((option: Timezones) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}