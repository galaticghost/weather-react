import { useEffect, useRef, useState } from "react"

export default function SearchLocation() {
    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [query, setQuery] = useState("");
    const abortRef = useRef<AbortController | null>(null);

    async function getLocation(query: string): Promise<Array<string>> {
        const url = `https://photon.komoot.io/api/?q=${query}&limit=5`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data
        } catch {
            return [];
        }
    }

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }
        const locations = getLocation(query);
        setSuggestions(locations);
    }, [query])

    return (
        <section>
            <input type="text" placeholder="Digite o nome da cidade..." onChange={(e) => setQuery(e.target.value)} />
        </section>
    )
}