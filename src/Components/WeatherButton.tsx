interface Props {
    getWeather: () => Promise<Object | void>;
};

export default function Button({ getWeather }: Props) {
    // Eu preciso mudar o nome desse botão TODO
    return (
        <button onClick={getWeather}>Get Weather</button>
    )
}