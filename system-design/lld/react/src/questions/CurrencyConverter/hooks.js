import { useEffect, useRef } from "react";

export function useClickOutside(fn) {
    const ref = useRef();

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                fn();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [fn]);

    return ref;
}
