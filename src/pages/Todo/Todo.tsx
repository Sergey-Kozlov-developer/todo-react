import SearchField from "../../components/SearchField/SearchField.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme.tsx";
import TaskList from "../../components/TaskList/TaskList.tsx";
import { useThemeState } from "../../context/useThemeState.tsx";
import PaginationComponent from "../../components/pagination/Pagination.tsx";
import { useTaskState } from "../../context/useTaskState.tsx";
import { useCallback, useEffect } from "react";
import { ApiService } from "../../api/apiService.ts";

const Todo = () => {
    const { theme } = useThemeState();
    const { setTasks } = useTaskState();

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
        <div className={`todo container ${theme}-theme`}>
            <h1 className="todo__title">TODO LIST</h1>
            <form className="todo__form">
                <SearchField />
                <Filter />
                <ToggleTheme />
            </form>
            <TaskList />
            <PaginationComponent />
        </div>
    );
};

export default Todo;
