import type { ChangeEventHandler } from "react";

export interface Timezones {
    value: string,
    label: string
}

const options: Array<Timezones> = [
    { value: "America%2FLos_Angeles", label: "America/Los Angeles" },
    { value: "America%2FSao_Paulo", label: "America/São Paulo" }
];

interface Props {
    timezone: string;
    onChange: (ChangeEventHandler<HTMLSelectElement>);
}

export default function Timezones({ timezone, onChange }: Props) {

    return (
        <div>
            <label htmlFor="timezones">Escolha a sua timezone: </label>
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