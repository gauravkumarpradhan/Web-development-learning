import React, { useState } from "react";
import OtpInput from "./OtpInput";

function Main() {
    const [inputVals, setInputVals] = useState(new Array(4).fill(null));
    console.log("Input vals ", inputVals);

    function submitOtp() {
        console.log("Input vals ", inputVals)
    }

    return (
        <div>
            <OtpInput
                count={4}
                inputVals={inputVals}
                setInputVals={setInputVals}
            />
            <button onClick={submitOtp}>Submit</button>
        </div>
    );
}

export default Main;
