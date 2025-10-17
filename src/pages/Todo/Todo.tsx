import SearchField from "../../components/SearchField/SearchField.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme.tsx";
import TaskList from "../../components/TaskList/TaskList.tsx";
import { useTaskFilterState } from "../../context/useTaskFilterState.tsx";
import { useEffect } from "react";

const Todo = () => {
    const { theme } = useTaskFilterState();

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }, [theme]);
    return (
        <div className={`todo container ${theme}-theme`}>
            <h1 className="todo__title">TODO LIST</h1>
            <form className="todo__form">
                <SearchField />
                <Filter />
                <ToggleTheme />
            </form>
            <TaskList />
        </div>
    );
};

export default Todo;
