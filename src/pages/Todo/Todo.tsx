import SearchField from "../../components/SearchField/SearchField.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme.tsx";
import TaskList from "../../components/TaskList/TaskList.tsx";
import { useThemeState } from "../../context/useThemeState.tsx";
import PaginationComponent from "../../components/pagination/Pagination.tsx";
import { useTaskState } from "../../context/useTaskState.tsx";
import { useCallback, useEffect, useState } from "react";
import { ApiService } from "../../api/apiService.ts";

const Todo = () => {
    const { theme } = useThemeState();
    const { setTasks } = useTaskState();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;

    // получаем данные пагинации
    const refreshTasks = useCallback(
        async (page: number = 1) => {
            const baseUrl = await ApiService.getTotalTasks(page, itemsPerPage);
            console.log("Получены задачи страницы", page, ":", baseUrl);

            setTasks(baseUrl.todos);
        },
        [setTasks, itemsPerPage]
    );
    // клик по кнопкам навигации
    const handlePageChange = useCallback(
        (page: number) => {
            console.log("Переход на страницу:", page);
            setCurrentPage(page);
            refreshTasks(page);
        },
        [refreshTasks]
    );

    // вызываем при загрузки страницы
    useEffect(() => {
        refreshTasks(currentPage);
    }, [refreshTasks, currentPage]);

    return (
        <div className={`todo container ${theme}-theme`}>
            <h1 className="todo__title">TODO LIST</h1>
            <form className="todo__form">
                <SearchField />
                <Filter />
                <ToggleTheme />
            </form>
            <TaskList />
            <PaginationComponent
                currentPage={currentPage}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

export default Todo;
