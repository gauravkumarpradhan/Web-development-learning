import { MAX, MIN } from "./constants";
import "./style.css";

function ProgressBar({ percentage }) {
    return (
        <div>
            <h1 id="progress-label">Progress bar</h1>
            <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemax={MAX}
                aria-valuemin={MIN}
                aria-labelledby="progress-label"
            >
                <span
                    className="percentage"
                    style={{ color: `${percentage < 49 ? "black" : "white"}` }}
                >
                    {percentage}%
                </span>
                <div
                    className="progress-bar-copy"
                    style={{
                        transform: `scaleX(${percentage / MAX})`,
                        transformOrigin: "left",
                        borderRadius: `${percentage < MAX ? "8px 0px 0px 8px" : "8px"
                            }`,
                    }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;
