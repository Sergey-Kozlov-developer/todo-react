import Todo from "./pages/Todo/Todo.tsx";

import { FilterStateProvider } from "./context/useTaskFilterState.tsx";
import { ThemeStateProvider } from "./context/useThemeState.tsx";
import { TaskProvider, useTaskState } from "./context/useTaskState.tsx";

function App() {
    return (
        <ThemeStateProvider>
            <TaskProvider>
                <FilterStateProvider>
                    <Todo />
                </FilterStateProvider>
            </TaskProvider>
        </ThemeStateProvider>
    );
}
export default App;
