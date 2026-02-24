import { useEffect, type RefObject } from "react";

export const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
    addEventListener = true // Caso a execução do callback seja condicional (ou seja, só aconteça se a condição for verdadeira)
) => {
    const handleClick = (event: MouseEvent) => {
        // Verifica se o node não contem a parte exterior 
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
            callback();
        }
    }

    useEffect(() => {
        if (addEventListener) {
            document.addEventListener('click', handleClick);
        }
        return () => {
            document.removeEventListener('click', handleClick);
        }
    })
}