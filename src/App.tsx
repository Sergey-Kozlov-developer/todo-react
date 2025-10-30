import Todo from "./pages/Todo/Todo.tsx";

import { FilterStateProvider } from "./context/useTaskFilterState.tsx";
import { ThemeStateProvider } from "./context/useThemeState.tsx";
import { TaskProvider } from "./context/useTaskState.tsx";
import { useCallback, useEffect } from "react";
import { ApiService } from "./api/apiService.ts";
import { useTaskReducer } from "./hook/useTaskReducer.ts";

function App() {
    const { setTasks } = useTaskReducer();
    // получаем данные с API
    const refreshTasks = useCallback(async () => {
        try {
            const apiData = await ApiService.getTodoList();

            console.log("apiData", apiData);

            setTasks(apiData);
        } catch (error) {
            console.error("Failed to fetch todos:", error);
            throw error;
        }
    }, []);
    // вызываем при загрузки страницы
    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);

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
