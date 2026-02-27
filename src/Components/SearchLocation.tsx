import { useEffect, useRef, useState } from "react"
import { useClickOutside } from "../hooks/useClickOutside";
import type { Location } from "../types/types";
import { useSearchedLocation } from "../hooks/useSearchedLocation";

interface Props {
    setLocation: (location: Location) => void;
}

export default function SearchLocation({ setLocation }: Props) {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions: Location[] | null = useSearchedLocation(debouncedQuery);
    const outsideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length > 3) {
                setDebouncedQuery(query);
            } else {
                setShowSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        // Evita mostrar as sugestões no inicio
        if (debouncedQuery) {
            setShowSuggestions(true);
        }
    }, [suggestions]);

    const closeSuggestions = () => {
        setShowSuggestions(false);
    }

    useClickOutside(outsideRef, closeSuggestions, showSuggestions);
    // TODO onclick do botão suggestions
    return (
        <section className="search-bar">
            <input type="text" autoComplete="off"
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
                {showSuggestions && suggestions.length == 0 && <div className="result">Não foi encontrada nenhuma localização com esse nome.</div>}
            </div>
        </section>
    )
}