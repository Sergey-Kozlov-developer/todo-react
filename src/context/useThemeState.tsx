import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from "react";

export const useThemeState = () => useContext(ThemeStateContext);

type Theme = "light" | "dark";

interface IThemeStateContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const initState: IThemeStateContextProps = {
    theme: "light",
    setTheme: () => {},
    toggleTheme: () => {},
};

// создаем контекст темы
const ThemeStateContext = createContext<IThemeStateContextProps>(initState);

export const ThemeStateProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>("light");
    const toggleTheme = () => {
        setTheme((current) => (current === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);

    return (
        <ThemeStateContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeStateContext.Provider>
    );
};
