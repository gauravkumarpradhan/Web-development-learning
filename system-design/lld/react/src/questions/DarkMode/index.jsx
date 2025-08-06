import { Link, Outlet } from "react-router-dom";
import "./style.css";
import { useThemeContext } from "./mode";

function MainPage() {
    const { toggleTheme } = useThemeContext();

    return (
        <div>
            <header className="header">
                <nav className="nav">
                    <Link to="first-page">First Page</Link>
                    <Link to="second-page">Second Page</Link>
                    <Link to="third-page">Third Page</Link>
                </nav>

                <div className="switch">
                    <input type="checkbox" className="input-checkbox" id="theme-toggle" />
                    <label htmlFor="theme-toggle" className="circle" onClick={toggleTheme} />
                </div>
            </header>

            <Outlet />
        </div>
    );
}

export default MainPage;
