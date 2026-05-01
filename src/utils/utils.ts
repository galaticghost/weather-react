const staticImages = import.meta.glob(
    "../assets/weather/static-images/*.svg",
    { eager: true } // Eager = Sem lazy loading
) as Record<string, { default: string }>;

const animatedImages = import.meta.glob(
    "../assets/weather/animated-images/*.svg",
    {eager: true} // Eager = Sem lazy loading
) as Record<string, {default: string}>;

const staticImageArr = Object.fromEntries(
    Object.entries(staticImages).map(([path, module]) => {
        const name = path.split("/").pop()?.replace(".svg", "");
        return [name, module.default];
    })
) as Record<string, string>;

const animatedImagesArr = Object.fromEntries(
    Object.entries(animatedImages).map(([path, module]) => {
        const name = path.split("/").pop()?.replace(".svg", "");
        return [name, module.default];
    })
) as Record<string, string>;

export function getCloudCoverDescription(cloudCover: number): string {
    if (cloudCover <= 10) return "cloudCover.clear";
    if (cloudCover <= 30) return "cloudCover.fewClouds";
    if (cloudCover <= 70) return "cloudCover.partlyCloudy";
    if (cloudCover <= 90) return "cloudCover.cloudy";
    return "cloudCover.overcast";
}

export function getWeatherImage(hour: number, cloudCover: number, 
    rain: number, animated: boolean = false): string {
    const image = animated ? animatedImagesArr : staticImageArr;
    if (hour > 18 || hour < 6 ) {
        if (rain > 0) {
            if (cloudCover <= 70) return image["rain-night"];
            return image["overcast-night-rain"];
        }

        if (cloudCover <= 10) return image["clear-night"];
        if (cloudCover <= 30) return image["few-clouds-night"];
        if (cloudCover <= 70) return image["partly-cloudy-night"];
        if (cloudCover <= 90) return image["overcast-night"]; //Não achei um cloudy-night decente
        return image["overcast-night"];
    } else {
        if (rain > 0) {
            if (cloudCover <= 70) return image["rain-day"];
            return image["overcast-day-rain"];
        }
        if (cloudCover <= 10) return image["clear-day"];
        if (cloudCover <= 30) return image["few-clouds-day"];
        if (cloudCover <= 70) return image["partly-cloudy-day"];
        if (cloudCover <= 90) return image["cloudy-day"];
        return image["overcast-day"];
    }
}


export function getHours(time: string): number {
    return Number(time.split("T")[1].split(":")[0]);
}
export function formatHour(time: string): string{
    return time.split("T")[1];
}

export function formatTemp(temp: number, unit: string) {
    if (unit === "fahrenheit") {
        return Math.round((temp * 9 / 5) + 32);
    }
    return Math.round(temp);
}

/*export function getWeatherGradient(cloudCover: number, precipitation: number): string {
    const h = new Date().getHours();

    if (h <= 6 || h >= 20) return "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    if (precipitation > 0) return "linear-gradient(135deg, #4e54c8, #8f94fb)";
    if (cloudCover < 10) return "linear-gradient(135deg, #fceabb, #f8b500)";
    if (cloudCover < 70) return "linear-gradient(135deg, #89f7fe, #66a6ff)";
    return "linear-gradient(135deg, #bdc3c7, #2c3e50)";
}*/