import Todo from "./pages/Todo/Todo.tsx";
import { FilterStateProvider } from "./context/useTaskFilterState.tsx";

function App() {
    return (
        <FilterStateProvider>
            <Todo />
        </FilterStateProvider>
    );
}

export default App;
