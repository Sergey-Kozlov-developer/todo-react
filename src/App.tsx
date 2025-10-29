import Todo from "./pages/Todo/Todo.tsx";

import { FilterStateProvider } from "./context/useTaskFilterState.tsx";
import { ThemeStateProvider } from "./context/useThemeState.tsx";
import { useEffect, useState } from "react";
import { ApiService } from "./api/apiService.ts";

function App() {
    const [data, setData] = useState<[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.getTodoList();
                console.log(data);

                setData(response);
            } catch (error) {
                console.error("Failed to fetch todos:", error);
                throw error;
            }
        };
        fetchData();
    }, []);

    return (
        <ThemeStateProvider>
            <FilterStateProvider>
                <Todo />
            </FilterStateProvider>
        </ThemeStateProvider>
    );
}
export default App;
