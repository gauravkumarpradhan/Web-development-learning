import { useState } from "react";
import "./style.css";

function ChipsInput() {
    const [info, setInfo] = useState({
        inputText: "",
        chips: [],
    });

    function addNewChip(e) {
        const val = e.target.value;
        if (e.key === "Enter" && val && val.length) {
            setInfo((prevInfo) => ({
                inputText: "",
                chips: [
                    ...prevInfo.chips,
                    { name: val, id: prevInfo.chips.length },
                ],
            }));
        }
    }

    function handleInputTextChange(e) {
        setInfo((prevInfo) => ({ ...prevInfo, inputText: e.target.value }));
    }

    function handleDeleteChipItem(id) {
        setInfo((prevInfo) => ({
            ...prevInfo,
            chips: prevInfo?.chips.filter((chipItem) => chipItem?.id !== id),
        }));
    }

    return (
        <div className="chip-input-container">
            <h1>Chips input page</h1>
            <div className="input-box">
                <input
                    onKeyDown={addNewChip}
                    value={info?.inputText}
                    onChange={handleInputTextChange}
                    placeholder="Type a chip and press tag"
                    type="text"
                />
            </div>
            {info.chips ? (
                <div className="chips-item-container">
                    {info?.chips?.map((chip, index) => {
                        return (
                            <div key={`${index}${chip?.id}`}>
                                <span>{chip?.name}</span>
                                <span
                                    onClick={() =>
                                        handleDeleteChipItem(chip?.id)
                                    }
                                    className="delete-icon"
                                >
                                    ❌
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}

export default ChipsInput;
