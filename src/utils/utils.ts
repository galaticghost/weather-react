export function getCloudCoverDescription(cloudCover: number): string {
    if (cloudCover <= 10) return "Céu limpo";
    if (cloudCover <= 30) return "Pouco nublado";
    if (cloudCover <= 70) return "Parcialmente nublado";
    if (cloudCover <= 90) return "Predominantemente nublado";
    return "Completamente nublado";
}

export function formatTemp(temp: number, unit: string) {
    if (unit === "fahrenheit") {
        return Math.round((temp * 9 / 5) + 32);
    }
    return Math.round(temp);
}