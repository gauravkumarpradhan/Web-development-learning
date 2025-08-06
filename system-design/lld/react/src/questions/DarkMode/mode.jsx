import { createContext, useContext, useEffect, useState } from "react";
import { THEME_VARIANTS } from "./constant";
const ThemeContext = createContext();

export const useThemeContext = () => {
    const { theme = "", toggleTheme = () => { } } = useContext(ThemeContext);
    return { theme, toggleTheme };
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(THEME_VARIANTS.LIGHT);

    function toggleTheme() {
        setTheme((prevTheme) =>
            prevTheme === THEME_VARIANTS.DARK
                ? THEME_VARIANTS.LIGHT
                : THEME_VARIANTS.DARK
        );
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
