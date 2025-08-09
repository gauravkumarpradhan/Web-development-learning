import { useEffect, useRef, useState } from 'react'

function useCopy() {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef();

    function handleCopy(text) {
        setCopied(true);
        navigator.clipboard.writeText(text).then(() => {
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 300);
        });


    };

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    return { handleCopy, copied }
}

export default useCopy