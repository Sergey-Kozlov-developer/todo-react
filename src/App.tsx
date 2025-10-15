import { createContext, useState } from "react";
import Todo from "./pages/Todo/Todo.tsx";

interface ISearchContext {
    searchValue: string;
    setSearchValue: (query: string) => void;
}

export const SearchContext = createContext<ISearchContext>({
    searchValue: "",
    setSearchValue: () => {},
});

function App() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Todo />
        </SearchContext.Provider>
    );
}

export default App;
