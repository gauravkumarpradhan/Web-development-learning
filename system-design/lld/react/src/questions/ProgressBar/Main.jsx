import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { MAX } from "./constants";
// we can use scale also in this case
/*
1. show Percentage in the component
2. Animate the progress bar from the given percetange as a prop
3. Give accessibilities too the component
 */

function Main() {
    const [progress, setProgress] = useState(30);

    useEffect(() => {
        let progressInterval;
        progressInterval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress === MAX) {
                    clearInterval(progressInterval);
                    return MAX;
                }
                return prevProgress + 1;
            });
        }, 100);
    }, []);

    return (
        <div>
            <ProgressBar percentage={progress} />
        </div>
    );
}

export default Main;
