import type { ChangeEventHandler } from "react";

interface Props {
    temperatureUnit: string
    onChange: (ChangeEventHandler<HTMLSelectElement>);
}

export default function TemperatureUnitSelection({ temperatureUnit, onChange }: Props) {
    return (
        <div>
            <label htmlFor="temperatureUnit">Unidade de temperatura</label>
            <select
                name="temperatureUnit"
                id="temperatureUnit"
                value={temperatureUnit}
                onChange={onChange}
            >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
            </select>
        </div>
    )
}