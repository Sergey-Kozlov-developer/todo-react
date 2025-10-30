import { useState } from "react";
import "./TaskList.scss";
import EmptyBlock from "../EmptyBlock/EmptyBlock.tsx";
import TaskItem from "../TaskItem/TaskItem.tsx";
import AddTaskModal from "../AddTaskModal/AddTaskModal.tsx";
import TaskButton from "../TaskButton/TaskButton.tsx";
import IconPlus from "../Icon/IconPlus.tsx";

import { useTaskReducer } from "../../hook/useTaskReducer.ts";

const TaskList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        task,
        filteredTasks,
        toggleTaskCompletion,
        handleClickDeleteTask,
        editTask,
        addTask,
    } = useTaskReducer();

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
                            text={task[taskId].todo}
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
