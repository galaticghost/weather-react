interface Props {
    getWeather: () => Promise<Object | void>;
};

export default function Button({ getWeather }: Props) {

    return (
        <button onClick={getWeather}>Balduo</button>
    )
}