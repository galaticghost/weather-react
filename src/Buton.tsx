export default function Button() {
    async function getWeather() {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=-30.0328&longitude=-51.2302&hourly=temperature_2m&timezone=America%2FSao_Paulo&forecast_days=1";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result)
        }
        catch (error: unknown) {
            let errorMessage = "Something went wrong";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            console.error(errorMessage);
        }
    }

    return (
        <button onClick={getWeather}>Balduo</button>
    )

}