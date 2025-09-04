interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function TemperatureUnitSelection({ onClick }: Props) {
    return (
        <div>
            <button className="temperature-unit" value="celsius" onClick={onClick}>Celsius</button>
            <button className="temperature-unit" value="fahrenheit" onClick={onClick}>Fahrenheit</button>
        </div>
    )
}