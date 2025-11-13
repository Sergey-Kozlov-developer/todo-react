import { useState } from "react";
import "./TaskList.scss";
import EmptyBlock from "../EmptyBlock/EmptyBlock.tsx";
import TaskItem from "../TaskItem/TaskItem.tsx";
import AddTaskModal from "../AddTaskModal/AddTaskModal.tsx";
import TaskButton from "../TaskButton/TaskButton.tsx";
import IconPlus from "../Icon/IconPlus.tsx";
import { useTaskState } from "../../context/useTaskState.tsx";

const TaskList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        taskState,
        toggleTaskCompletion,
        handleClickDeleteTask,
        editTask,
        addTask,
    } = useTaskState();

    if (taskState.length === 0) {
        return <EmptyBlock />;
    }

    return (
        <>
            <div className="task-list">
                <ul className="task-list__items">
                    {taskState.map((task) => (
                        <TaskItem
                            key={task.id}
                            taskId={task.id}
                            isCheck={task.completed}
                            toggleCompleted={() => toggleTaskCompletion(task)}
                            completed={task.completed}
                            text={task.todo}
                            deleteTask={() => handleClickDeleteTask(task.id)}
                            editTask={editTask}
                            isTemp={task.isTemp}
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
