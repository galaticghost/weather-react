import { useEffect, useRef, useState } from "react"
import { useClickOutside } from "../hooks/useClickOutside";
import type { Location } from "../types/types";

interface Props {
    setLocation: (
        location: Location
    ) => void;
}

export default function SearchLocation({ setLocation }: Props) {
    const [suggestions, setSuggestions] = useState<Location[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showQueryError, setShowQueryError] = useState(false);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const abortRef = useRef<AbortController | null>(null);
    const outsideRef = useRef<HTMLDivElement | null>(null);

    const closeSuggestions = () => {
        setShowQueryError(false);
        setSuggestions([]);
        setShowSuggestions(false);
    }

    useClickOutside(outsideRef, closeSuggestions, showSuggestions);

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
            if (data.features.length > 0) {
                const dataParsed: Location[] = data.features.map((f: any) => ({
                    city: f.properties.name,
                    country: f.properties.country,
                    latitude: f.geometry.coordinates[1],
                    longitude: f.geometry.coordinates[0],
                }));
                console.log(data)
                setShowQueryError(false);
                setSuggestions(dataParsed);
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
                setSuggestions([]);
                setShowQueryError(true);
            }
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
        setShowQueryError(false);
        setShowSuggestions(false);
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (debouncedQuery.length < 2 || !debouncedQuery) {
            setSuggestions([]);
            return;
        }
        getLocation(debouncedQuery);
    }, [debouncedQuery]);
    // TODO onclick do botão suggestions
    return (
        <section className="search-bar">
            <input id="1" type="text" autoComplete="off"
                placeholder="Digite o nome da cidade..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="results-container" ref={outsideRef}>
                {showSuggestions && suggestions.length > 0 && (suggestions.map((suggestion, index) => (
                    <button key={index} className="result" onClick={() => { setLocation(suggestion); closeSuggestions() }} >
                        {suggestion.city},{suggestion.country}
                    </button>
                )))
                }
                {showQueryError && <div className="result">Não foi encontrada nenhuma localização com esse nome.</div>}
            </div>
        </section>
    )
}