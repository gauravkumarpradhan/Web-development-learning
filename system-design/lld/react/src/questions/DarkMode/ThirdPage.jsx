import { useThemeContext } from "./mode";

function ThirdPage() {
    const { theme } = useThemeContext();

    return (
        <div>
            <h1 data-theme={theme}>Third Page</h1>
            <div>Welcome to third page</div>
        </div>
    )
}

export default ThirdPage