import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useClickOutside } from "../CurrencyConverter/hooks";
import "./style.css";

function MultiSelectInput() {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [pills, setPills] = useState({});
    const pillsArray = useMemo(() => {
        return Object.values(pills);
    }, [pills]);
    const ref = useClickOutside(() => setShowOptions(false));
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        async function fetProducts() {
            fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
                .then((res) => res.json())
                .then((res) => setOptions(res?.users));
        }

        fetProducts();
    }, [searchTerm]);

    function handleOptionClick(optionInfo) {
        setPills((prevPills) => {
            const clonedPrevPills = structuredClone(prevPills);
            const isOptionPresent = pills[optionInfo?.id];
            if (isOptionPresent) {
                delete clonedPrevPills[optionInfo?.id];
            } else {
                clonedPrevPills[optionInfo?.id] = optionInfo;
            }
            return clonedPrevPills;
        });
    }

    function handleBackspaceActionEvent(e) {
        const keyName = e.key;
        const value = e.target.value;
        if (keyName === "ArrowDown") {
            setCurrentIndex(currentIndex + 1);
            return;
        } else if (keyName === "ArrowUp") {
            setCurrentIndex(currentIndex - 1);
            return;
        }

        if (keyName !== "Backspace") return;

        if (!value) {
            const popOption = pillsArray[pillsArray.length - 1];
            setPills((prevPills) => {
                const newPills = structuredClone(prevPills);
                delete newPills[popOption?.id];
                return newPills;
            });
        }
    }

    return (
        <div className="wrapper" ref={ref}>
            <div className="input-container">
                <div className="chips-container">
                    {pillsArray.length
                        ? pillsArray.map((pill, index) => {
                            return (
                                <div className="chip-item" key={index}>
                                    <div>{pill.firstName}</div>
                                    <div
                                        className="chip-item-close-icon"
                                        onClick={() =>
                                            handleOptionClick(pill)
                                        }
                                    >
                                        {"❌"}
                                    </div>
                                </div>
                            );
                        })
                        : null}
                    <input
                        id="input-bar"
                        onFocus={() => setShowOptions(true)}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a user..."
                        onKeyDown={handleBackspaceActionEvent}
                    />
                </div>
            </div>

            {showOptions ? (
                <div className="options-container">
                    {options?.map((option, index) => {
                        return !pills[option.id] ? (
                            <div
                                key={index}
                                className={`${currentIndex === index
                                    ? "option-item-selected"
                                    : ""
                                    } option-item`}
                                onClick={() => {
                                    handleOptionClick(option);
                                    setCurrentIndex(-1);
                                }}
                            >
                                {option?.firstName}
                            </div>
                        ) : null;
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default MultiSelectInput;
