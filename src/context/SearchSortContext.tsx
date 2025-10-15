import { createContext, useState, type ReactNode } from "react";

export interface ISearchContext {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const SearchContext = createContext<ISearchContext>({
    searchQuery: "",
    setSearchQuery: () => {},
});

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};
