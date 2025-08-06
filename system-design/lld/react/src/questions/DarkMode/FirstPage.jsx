import React from 'react'
import { useThemeContext } from './mode'

function FirstPage() {
    const { theme } = useThemeContext();

    return (
        <div>
            <h1 data-theme={theme}>First Page</h1>
            <div>Welcome to first page</div>
        </div>
    )
}

export default FirstPage