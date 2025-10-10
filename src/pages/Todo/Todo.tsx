import { useState } from "react";

import iconPlus from "../../assets/images/icon-plus.svg";
import SearchField from "../../components/SearchField/SearchField.tsx";
import Filter from "../../components/Filter/Filter.tsx";
import ToggleTheme from "../../components/ToggleTheme/ToggleTheme.tsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.tsx";
import TaskList from "../../components/TaskList/TaskList.tsx";

const Todo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="todo container">
            <h1 className="todo__title">TODO LIST</h1>
            <form className="todo__form">
                <SearchField />
                <Filter />
                <ToggleTheme />
            </form>
            <TaskList />
            <div className="todo add-task">
                <button
                    className="add-task__button"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src={iconPlus} alt="Add task" />
                </button>
            </div>
            {isModalOpen && (
                <AddTaskModal
                    // isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Todo;
