import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";
import { FilterListEnum } from "../enums/filterListEnum";
// кастомный хук поиска
export const useTaskFilterState = () => useContext(FilterStateContext);
interface ITaskFilterStateContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterType: FilterListEnum;
    setFilterType: (sort: FilterListEnum) => void;
}

const initState: ITaskFilterStateContextProps = {
    searchQuery: "",
    setSearchQuery: () => {},
    filterType: FilterListEnum.ALL,
    setFilterType: () => {},
};

// создаем context
const FilterStateContext =
    createContext<ITaskFilterStateContextProps>(initState);

export const FilterStateProvider = ({ children }: PropsWithChildren) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<FilterListEnum>(
        FilterListEnum.ALL
    );

    return (
        <FilterStateContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                filterType,
                setFilterType,
            }}
        >
            {children}
        </FilterStateContext.Provider>
    );
};
