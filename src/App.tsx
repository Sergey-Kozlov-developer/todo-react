import Todo from "./pages/Todo/Todo.tsx";

import { FilterStateProvider } from "./context/useTaskFilterState.tsx";
import { ThemeStateProvider } from "./context/useThemeState.tsx";

function App() {
    return (
        <ThemeStateProvider>
            <FilterStateProvider>
                <Todo />
            </FilterStateProvider>
        </ThemeStateProvider>
    );
}
export default App;
