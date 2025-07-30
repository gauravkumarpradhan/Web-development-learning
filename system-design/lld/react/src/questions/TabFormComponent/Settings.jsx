import React from 'react'

function Settings({ formData, onChange }) {
    const settingsFormConfig = [
        { name: "settings", key: "darkmode", label: "Dark mode" },
        { name: "settings", key: "lightmode", label: "Light mode" }
    ];

    return <div>
        {settingsFormConfig?.map((field, index) => {

            return (
                <div key={index} className="checkbox-container">
                    <input
                        type="radio"
                        name={field?.name}
                        value={field?.key}
                        checked={formData.settings === field?.key}
                        onChange={onChange}
                    />

                    <div>{field?.label}</div>
                </div>
            );
        })}
    </div>

}

export default Settings