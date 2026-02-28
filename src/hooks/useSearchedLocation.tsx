import { useEffect, useState } from "react";
import type { Location } from "../types/types";
import { getLocationByQuery } from "../service/locationService";

export function useSearchedLocation(query: string) {
    const [searchedLocation, setSearchedLocation] = useState<Location[]>([]);

    useEffect(() => {
        // Verifica se a query é invalída
        if (!query || query.trim().length <= 3) {
            setSearchedLocation([]);
            return; // Da uma olhada no return
        }
        const controller = new AbortController();
        (async () => {
            try {
                const data = await getLocationByQuery(controller, query)
                if (data) {
                    setSearchedLocation(data);
                } else {
                    setSearchedLocation([]);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
                setSearchedLocation([]);
            }
        })();
        return () => {
            controller.abort("The user has made another request");
        }
    }
        , [query]);
    return searchedLocation;
}