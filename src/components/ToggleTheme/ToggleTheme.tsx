import toggleIconTheme from "../../assets/images/icon-theme.svg";
import iconLight from "../../assets/images/icon-light.svg";
import { useTaskFilterState } from "../../context/useTaskFilterState";

const ToggleTheme = () => {
    const { toggleTheme, theme } = useTaskFilterState();
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
