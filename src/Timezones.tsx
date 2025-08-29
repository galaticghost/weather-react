import { useState } from "react"

export interface Timezones{
    value: string,
    label: string
}

const options: Array<Timezones> = [
    {value: "America%2FLos_Angeles", label: "America/Los Angeles"},
    {value: "America%2FSao_Paulo", label: "America/São Paulo"}
];

export function getTimezone(props : Timezones){
    return (
        props.value
    );
}

export default function Timezones(){
    const [timezone, setTimezones] = useState("America%2FSao_Paulo");

    const handleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimezones(event.target.value);
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