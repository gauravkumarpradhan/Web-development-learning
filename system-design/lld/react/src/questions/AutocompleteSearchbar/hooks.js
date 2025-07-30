import { useEffect, useRef } from "react";

export default function useDebounce(fn, wait) {
    const timerRef = useRef();

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return function () {
        if (timerRef) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            fn();
        }, wait);
    };
}
