import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";
import { FilterListEnum } from "../enums/filterListEnum";
// кастомный хук поиска
export const useTaskFilterState = () => useContext(FilterStateContext);

type Theme = "light" | "dark";

interface ITaskFilterStateContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterType: FilterListEnum;
    setFilterType: (sort: FilterListEnum) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const initState: ITaskFilterStateContextProps = {
    searchQuery: "",
    setSearchQuery: () => {},
    filterType: FilterListEnum.ALL,
    setFilterType: () => {},
    theme: "light",
    setTheme: () => {},
    toggleTheme: () => {},
};

// создаем context
const FilterStateContext =
    createContext<ITaskFilterStateContextProps>(initState);

export const FilterStateProvider = ({ children }: PropsWithChildren) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<FilterListEnum>(
        FilterListEnum.ALL
    );
    const [theme, setTheme] = useState<Theme>("light");
    const toggleTheme = () => {
        setTheme((current) => (current === "light" ? "dark" : "light"));
    };

    return (
        <FilterStateContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                filterType,
                setFilterType,
                theme,
                setTheme,
                toggleTheme,
            }}
        >
            {children}
        </FilterStateContext.Provider>
    );
};
