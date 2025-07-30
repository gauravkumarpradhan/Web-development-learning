import React, { useState } from "react";
import Tabs from "./Tabs";
import Profile from "./Profile";
import Interest from "./Interest";
import Settings from "./Settings";
import "./style.css";

function validateField(name, value) {
    let error = "";

    if (name === "name") {
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length <= 2)
            error = "Name field value should be greater than 2";
    }

    if (name === "email") {
        if (!value.trim()) error = "Email is a mandatory field";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
            error = "Email is not valid";
    }

    if (name === "age") {
        const age = +value;
        if (!age) error = "Age is a mandatory field";
        else if (age < 12) error = "Age should be greater than 12";
    }

    if (name === "interest") {
        if (!value || !value.length) error = "Interest is a mandatory field";
    }

    if (name === "settings") {
        if (!value.trim()) error = "Settings is a mandatory field";
    }

    return error;
}

function TabFormComponent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        interest: ["food"],
        settings: "darkmode",
    });

    const [errors, setErrors] = useState({});
    const [currentTab, setCurrentTab] = useState(1);

    function handleChange(e) {
        const { name, value, checked } = e.target;

        setFormData((prev) => {
            let updatedValue;

            if (name === "interest") {
                updatedValue = checked
                    ? [...prev.interest, value]
                    : prev.interest.filter((val) => val !== value);
            } else {
                updatedValue = value;
            }

            // Run inline field-level validation
            const fieldError = validateField(name, updatedValue);
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: fieldError || undefined,
            }));

            return {
                ...prev,
                [name]: updatedValue,
            };
        });
    }

    function validatePageFields(fields) {
        const newErrors = {};

        fields.forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length > 0;
    }

    const validateProfilePage = () => validatePageFields(["name", "email", "age"]);
    const validateInterestPage = () => validatePageFields(["interest"]);
    const validateSettingsPage = () => validatePageFields(["settings"]);

    const tabsConfig = [
        {
            title: "Profile",
            component: (
                <Profile
                    store={formData}
                    onChange={handleChange}
                    errors={errors}
                />
            ),
            validate: validateProfilePage,
            key: 1,
        },
        {
            title: "Interest",
            component: (
                <Interest
                    formData={formData}
                    onChange={handleChange}
                    errors={errors}
                />
            ),
            validate: validateInterestPage,
            key: 2,
        },
        {
            title: "Settings",
            component: (
                <Settings
                    formData={formData}
                    onChange={handleChange}
                    errors={errors}
                />
            ),
            validate: validateSettingsPage,
            key: 3,
        },
    ];

    const currentValidateFunc = tabsConfig[currentTab - 1]?.validate;

    function handleSubmitBtnClick() {
        const hasError = currentValidateFunc();
        if (!hasError) {
            console.log("Submitted:", formData);
            alert("Form submitted successfully!");
        }
    }

    return (
        <div>
            <Tabs
                tabs={tabsConfig}
                currentTab={currentTab}
                onClick={setCurrentTab}
            />

            <div className="btn-container">
                <button
                    disabled={currentTab === 1}
                    onClick={() => {
                        if (!currentValidateFunc()) {
                            setCurrentTab(currentTab - 1);
                        }
                    }}
                >
                    Prev
                </button>

                {currentTab === 3 ? (
                    <button onClick={handleSubmitBtnClick}>Submit</button>
                ) : (
                    <button
                        disabled={currentTab === 3}
                        onClick={() => {
                            if (!currentValidateFunc()) {
                                setCurrentTab(currentTab + 1);
                            }
                        }}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}

export default TabFormComponent;
