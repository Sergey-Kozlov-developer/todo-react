import { useState } from "react";
import "./TaskList.scss";
import EmptyBlock from "../EmptyBlock/EmptyBlock.tsx";
import TaskItem from "../TaskItem/TaskItem.tsx";
import AddTaskModal from "../AddTaskModal/AddTaskModal.tsx";
import TaskButton from "../TaskButton/TaskButton.tsx";
import IconPlus from "../Icon/IconPlus.tsx";

import { useTaskReducer } from "../../hook/useReducerHook.ts";
import { useTaskFilterState } from "../../context/useTaskFilterState.tsx";
import { FilterListEnum } from "../../enums/filterListEnum.ts";

const TaskList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { searchQuery, filterType } = useTaskFilterState();
    const {
        task,
        toggleTaskCompletion,
        handleClickDeleteTask,
        editTask,
        addTask,
    } = useTaskReducer();

    // поиск по задачам
    const searchedTasks = Object.keys(task).filter((taskId) => {
        return task[taskId].text
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
    });

    // фильтрация по ALL, Complete, Incomplete
    const filteredTasks = searchedTasks.filter((taskId) => {
        const taskFilter = task[taskId];
        switch (filterType) {
            case FilterListEnum.COMPLETE:
                return taskFilter.completed;
            case FilterListEnum.INCOMPLETE:
                return !taskFilter.completed;
            case FilterListEnum.ALL:
            default:
                return true;
        }
    });

    if (filteredTasks.length === 0) {
        return <EmptyBlock />;
    }

    return (
        <>
            <div className="task-list">
                <ul className="task-list__items">
                    {filteredTasks.map((taskId) => (
                        <TaskItem
                            key={taskId}
                            taskId={taskId}
                            isCheck={task[taskId].completed}
                            toggleCompleted={() => toggleTaskCompletion(taskId)}
                            completed={task[taskId].completed}
                            text={task[taskId].text}
                            deleteTask={() => handleClickDeleteTask(taskId)}
                            editTask={editTask}
                        />
                    ))}
                </ul>
            </div>
            <div className="todo add-task">
                <TaskButton
                    className="add-task__button"
                    icon={<IconPlus />}
                    onClickIcon={() => setIsModalOpen(true)}
                />
            </div>
            {isModalOpen && (
                <AddTaskModal
                    onClose={() => setIsModalOpen(false)}
                    addTask={addTask}
                />
            )}
        </>
    );
};

export default TaskList;
