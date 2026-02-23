import { useEffect, useRef, useState } from "react"

interface Props {
    setLocation: (
        city: string,
        country: string,
        latitude: string,
        longitude: string
    ) => void;

}

export default function SearchLocation({ setLocation }: Props) {
    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const abortRef = useRef<AbortController | null>(null);

    async function getLocation(query: string) {
        if (abortRef.current) {
            abortRef.current.abort("The user has made another request");
        }

        const controller = new AbortController();
        abortRef.current = controller;
        const signal = abortRef.current.signal;

        const url = `https://photon.komoot.io/api/?q=${query}&limit=5`;
        try {
            const response = await fetch(url, { signal });
            if (!response.ok) { throw new Error(`Response status: ${response.status}`); }
            const data = await response.json();
            console.log(data);
            setSuggestions(data);
            setShowSuggestions(true);
            console.log("dols");
        } catch (error: unknown) {
            if (signal.reason) {
                console.error(signal.reason);
            }
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            console.log("time")
        }, 300);
        return () => clearTimeout(timer);
    }, [query])

    useEffect(() => {
        if (debouncedQuery.length < 2 || !debouncedQuery) {
            setSuggestions([]);
            return;
        }
        getLocation(debouncedQuery);
    }, [debouncedQuery])

    return (
        <section>
            <input id="1" type="text" placeholder="Digite o nome da cidade..." onChange={(e) => setQuery(e.target.value)} />
            {showSuggestions && suggestions.length > 0 && (suggestions.map((suggestion, index) => (
                <button key={index}>{suggestion.city}</button>
            ))
            )
            }
        </section>
    )
}