import Todo from "./pages/Todo/Todo.tsx";
import { SearchStateProvider } from "./context/useSearchState.tsx";

function App() {
    return (
        <SearchStateProvider>
            <Todo />
        </SearchStateProvider>
    );
}

export default App;
