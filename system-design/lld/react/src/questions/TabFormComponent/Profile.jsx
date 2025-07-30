import React, { useEffect } from "react";
export function debounce(fn, wait) {
    let timer;
    if (timer) {
        clearTimeout(timer);
    }

    return function (e) {
        timer = setTimeout(() => {
            console.log("Triggered")
            fn.apply(this, e);
        }, wait);
    }
}

function Profile({ store, onChange, validate, errors }) {


    const profileFormConfig = [
        { name: "name", type: "string", label: "Name", value: store["name"] },
        {
            name: "email",
            type: "string",
            label: "Email",
            value: store["email"],
        },
        { name: "age", type: "number", label: "Age", value: store["age"] },
    ];


    return (
        <div>
            {profileFormConfig?.map((field, index) => {
                return (
                    <div key={index}>
                        <div>{field?.label}</div>
                        <input
                            type={field?.type}
                            name={field?.name}
                            onChange={(e) => {
                                onChange(e);
                            }}
                            value={field?.value}
                        />
                        <div className="error-label">{errors[field?.name]}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default Profile;
