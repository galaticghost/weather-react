import { useEffect, useState } from "react";
import type { Location } from "../types/types";
import { getLocationByIp } from "../service/locationService";

export function useCurrentLocation() {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                const data = await getLocationByIp(controller)
                setCurrentLocation(data)
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                setCurrentLocation(null);
            }
        })();
        return () => {
            controller.abort("The user has made another request");
        }
    }, []
    )
    return currentLocation
}