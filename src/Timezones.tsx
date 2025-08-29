import { useState } from "react"

export interface Timezones{
    value: string,
    label: string
}

const options: Array<Timezones> = [
    {value: "America%2FLos_Angeles", label: "America/Los Angeles"},
    {value: "America%2FSao_Paulo", label: "America/São Paulo"}
];

interface Props{
    timezone: string;
    setTimezone: (value: string) => void;
}

export default function Timezones({timezone, setTimezone}: Props){


    const handleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimezone(event.target.value);
    } 
    return (
        <div>
            <label htmlFor="timezones">Escolha a sua timezone: </label>
            <select 
                name="timezones" 
                id="timezones" 
                value={timezone} 
                onChange={handleChange}
            >
                {options.map((option: Timezones) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}