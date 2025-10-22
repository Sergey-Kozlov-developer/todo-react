import toggleIconTheme from "../../assets/images/icon-theme.svg";
import iconLight from "../../assets/images/icon-light.svg";
import { useThemeState } from "../../context/useThemeState";

const ToggleTheme = () => {
    const { toggleTheme, theme } = useThemeState();
    return (
        <div className="theme-toggle">
            <button
                type="button"
                className="theme-toggle__button"
                onClick={toggleTheme}
            >
                <img
                    src={theme === "light" ? toggleIconTheme : iconLight}
                    alt={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                />
            </button>
        </div>
    );
};

export default ToggleTheme;
