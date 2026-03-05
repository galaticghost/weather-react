export function getCloudCoverDescription(cloudCover: number): string {
    if (cloudCover <= 10) return "cloudCover.clear";
    if (cloudCover <= 30) return "cloudCover.fewClouds";
    if (cloudCover <= 70) return "cloudCover.partlyCloudy";
    if (cloudCover <= 90) return "cloudCover.cloudy";
    return "cloudCover.overcast";
}

export function formatTemp(temp: number, unit: string) {
    if (unit === "fahrenheit") {
        return Math.round((temp * 9 / 5) + 32);
    }
    return Math.round(temp);
}

export function getWeatherGradient(cloudCover: number, precipitation: number): string {
    const d = new Date()
    const h = d.getHours();

    if (h <= 6 || h >= 20) return "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    if (precipitation > 0) return "linear-gradient(135deg, #4e54c8, #8f94fb)";
    if (cloudCover < 10) return "linear-gradient(135deg, #fceabb, #f8b500)";
    if (cloudCover < 70) return "linear-gradient(135deg, #89f7fe, #66a6ff)";
    return "linear-gradient(135deg, #bdc3c7, #2c3e50)";
}