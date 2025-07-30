import React from "react";

function Interest({ formData, onChange, errors }) {
    const interestConfig = [
        { name: "interest", label: "Games", key: "games" },
        { name: "interest", label: "Food", key: "food" },
        { name: "interest", label: "Swimming", key: "swimming" },
    ];


    return (
        <div>
            {interestConfig?.map((field, index) => {
                const isChecked = formData?.interest?.includes(field?.key);

                return (
                    <div ky={index} className="checkbox-container">
                        <input
                            type="checkbox"
                            name={field?.name}
                            checked={isChecked}
                            value={field?.key}
                            onChange={onChange}
                        />

                        <div>{field?.label}</div>
                    </div>
                );
            })}
            <div className="error-label">{errors["interest"]}</div>
        </div>
    );
}

export default Interest;
