import { useEffect, useState } from "react";

const staticRes = { strength: "", password: "", generatePassword: () => { } };

export default function usePasswordGenerator({ schema = {} }) {
    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState("");

    useEffect(() => {
        if (password.length) {
            setStrength(checkPasswordStrength());
        }
    }, [password]);

    function checkPasswordStrength() {
        let score = 0;

        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;

        if (/[A-Z]/.test(password)) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (score <= 2) return "Weak";
        else if (score <= 4) return "Medium";
        return "Strong";
    }

    function generatePassword() {
        let newPassword = "";
        const reqSchemaValidations = Object.keys(schema).filter(
            (key) => typeof schema[key] === typeof true && !!schema[key]
        );

        const response = reqSchemaValidations.reduce((charset, curEle) => {
            switch (curEle) {
                case "uppercase":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;

                case "lowercase":
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    break;

                case "numbers":
                    charset += "0123456789";
                    break;

                case "symbols":
                    charset += "!@#$%^&*()_+[]{}|;:,.<>?/~`-=";
                    break;

                default:
                    break;
            }

            return charset;
        }, "");

        if (!response.length) {
            return staticRes;
        }

        for (var i = 0; i < schema?.length; i++) {
            const charIndex = Math.floor(Math.random() * response.length);
            newPassword += response?.charAt(charIndex);
        }
        checkPasswordStrength();
        setPassword(newPassword);
    }

    return { password, generatePassword, strength };
}
