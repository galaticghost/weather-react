import type { Location, LocationQuery } from "../types/types";

export async function getLocationByQuery(controller: AbortController, query: string,): Promise<Location[] | null> {
    const url = `https://photon.komoot.io/api/?q=${query}&limit=5`;
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
        const data = await response.json();
        if (data.features.length > 0) {
            const dataParsed: Location[] = data.features.map((f: LocationQuery) => ({
                city: f.properties.name,
                country: f.properties.country,
                latitude: f.geometry.coordinates[1],
                longitude: f.geometry.coordinates[0],
            }));
            return dataParsed;
        } else {
            return null
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return null;
    }

}
export async function getLocationByIp(controller: AbortController): Promise<Location | null> {
    try {
        //Mudar api
        const response = await fetch("https://ipinfo.io/json", { signal: controller.signal })
        if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
        const data = await response.json();
        console.log(data);
        const [lat, log] = data.loc.split(",");

        const location: Location = {
            city: data.city,
            country: data.country,
            latitude: Number(lat),
            longitude: Number(log)
        };
        return location
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return null
    }
}

