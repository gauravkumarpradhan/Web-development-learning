import React from 'react'
import { useThemeContext } from './mode';

function SecondPage() {
    const { theme } = useThemeContext();

    return (
        <div>
            <h1 data-theme={theme}>Second Page</h1>
            <div>Welcome to second page</div>
        </div>
    )
}

export default SecondPage