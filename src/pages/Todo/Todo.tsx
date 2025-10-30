import SearchField from "../../components/SearchField/SearchField.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme.tsx";
import TaskList from "../../components/TaskList/TaskList.tsx";
import { useThemeState } from "../../context/useThemeState.tsx";
import PaginationComponent from "../../components/pagination/Pagination.tsx";

const Todo = () => {
    const { theme } = useThemeState();

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
