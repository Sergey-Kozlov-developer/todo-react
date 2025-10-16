import {
    createContext,
    useContext,
    useState,
    type PropsWithChildren,
} from "react";
// кастомный хук поиска
export const useSearchState = () => useContext(SearchStateContext);
interface ISearchStateContextProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const initState: ISearchStateContextProps = {
    searchQuery: "",
    setSearchQuery: () => {},
};

const SearchStateContext = createContext<ISearchStateContextProps>(initState);

export const SearchStateProvider = ({ children }: PropsWithChildren) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchStateContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchStateContext.Provider>
    );
};
