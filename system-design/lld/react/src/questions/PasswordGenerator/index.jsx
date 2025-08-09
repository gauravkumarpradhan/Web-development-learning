import React, { useState } from "react";
import "./style.css";
import { FaRegCopy } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { CHECK_BOXES_CONFIG } from "./constant";
import usePasswordGenerator from "./usePasswordGenerator";

function PasswordGenerator() {
    const [copied, setCopied] = useState(false);
    const [config, setConfig] = useState({
        length: 0,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
    });
    const { password, generatePassword, strength } = usePasswordGenerator({
        schema: config,
    });

    function handleCopy() {
        setCopied(true);
        navigator.clipboard.writeText(password).then(async () => {
            setTimeout(() => {
                setCopied(false);
            }, 300);
        });
    }

    function handleCheckboxSelection(key) {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [key]: !prevConfig[key],
        }));
    }

    return (
        <div className="main-container">
            <h1>Password Generator</h1>
            <div className="container">
                <div className="copy-container">
                    <div>{password ? password : ""}</div>
                    <div className="copy-icon" onClick={handleCopy}>
                        {copied ? <FaCopy /> : <FaRegCopy />}
                    </div>
                </div>

                <div className="container-body">
                    <div className="char-len-section">
                        <div className="char-len-label-section">
                            <div>Character Length</div>
                            <div>{config.length}</div>
                        </div>

                        <div>
                            <input
                                type="range"
                                min={0}
                                value={config.length}
                                onChange={(e) => {
                                    setConfig((prevConfig) => ({
                                        ...prevConfig,
                                        length: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                    </div>

                    <div className="checkbox-section">
                        {CHECK_BOXES_CONFIG?.map((checkboxInfo, index) => (
                            <div className="checkbox-section-item" key={index}>
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        handleCheckboxSelection(
                                            checkboxInfo?.key
                                        )
                                    }
                                    checked={config?.[checkboxInfo?.key]}
                                    value={"uppercase"}
                                    id={checkboxInfo?.key}
                                />
                                <label htmlFor={checkboxInfo?.key}>
                                    {checkboxInfo?.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="strength-section">
                            <div>Strength</div>
                            <div>{strength ? strength : "-"}</div>
                        </div>

                        <button onClick={generatePassword} >
                            Generate Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordGenerator;
