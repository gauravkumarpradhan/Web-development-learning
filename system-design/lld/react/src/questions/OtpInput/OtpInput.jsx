import { useEffect, useRef, useState } from "react";
import "./style.css";

function OtpInput({ count, inputVals, setInputVals }) {
    const otpInputRef = useRef({});
    const [currentIndex, setCurrentIndex] = useState(null);

    const Input = ({ index, onChange, handleKeywordPress }) => {
        return (
            <input
                className="otp-item"
                ref={(_ref) => (otpInputRef.current[index] = _ref)}
                onChange={onChange}
                type="string"
                value={inputVals[index] ?? ""}
                onKeyDown={handleKeywordPress}
            />
        );
    };

    useEffect(() => {
        if (
            currentIndex != null &&
            currentIndex >= 0 &&
            currentIndex < count
        ) {
            const input = otpInputRef.current[currentIndex];
            if (input) {
                // Wait for DOM to update before focusing
                setTimeout(() => {
                    input.focus();
                    const len = input.value.length;
                    input.setSelectionRange(len, len);
                }, 0);
            }
        }
    }, [currentIndex]);

    function handleOnChange(e, index) {
        let otpItemValue = e.target.value;
        if (otpItemValue.length > 1) {
            otpItemValue = otpItemValue.charAt(0);
        }

        if (index < count && otpItemValue > -1) {
            // Blur current input and update value
            otpInputRef.current[index].blur();

            setInputVals((vals) => {
                const newVals = [...vals];
                newVals[index] = otpItemValue;
                return newVals;
            });

            if (index < count - 1) {
                setCurrentIndex(index + 1);
            }
        }
    }

    function handleKeywordPress(e, index) {
        const pressedKey = e.key;
        const inputVal = e.target.value;

        if (pressedKey === "ArrowRight" && index < count - 1) {
            setCurrentIndex(index + 1);
        } else if (pressedKey === "ArrowLeft" && index > 0) {
            setCurrentIndex(index - 1);
        } else if (pressedKey === "Backspace") {
            e.preventDefault();
            if (inputVal) {
                setInputVals((vals) => {
                    const newVals = [...vals];
                    newVals[index] = "";
                    return newVals;
                });
                setCurrentIndex(index);
            } else if (index > 0) {
                setInputVals((vals) => {
                    const newVals = [...vals];
                    newVals[index - 1] = "";
                    return newVals;
                });
                setCurrentIndex(index - 1);
            }
        }
    }

    return (
        <div className="input-container">
            {[...new Array(count)].map((_, index) => (
                <div key={index}>
                    <Input
                        index={index}
                        onChange={(e) => handleOnChange(e, index)}
                        handleKeywordPress={(e) =>
                            handleKeywordPress(e, index)
                        }
                    />
                </div>
            ))}
        </div>
    );
}

export default OtpInput;
