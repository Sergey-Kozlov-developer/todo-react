import { useEffect, useRef, useState } from "react";
import IconDelete from "../Icon/IconDelete";
import IconEdit from "../Icon/IconEdit";
import IconSave from "../Icon/IconSave";
import IconCancel from "../Icon/IconCancel";
import TaskButton from "../TaskButton/TaskButton";
// import AddTaskModal from "../AddTaskModal/AddTaskModal";

interface ITaskItemProps {
    taskId: string;
    // isCheck: boolean;
    toggleCompleted: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
    editTask: (taskId: string, newText: string) => void;
    completed: boolean;
    text: string;
}

const TaskItem = ({
    // isCheck,
    toggleCompleted,
    deleteTask,
    editTask,
    taskId,
    completed,
    text,
}: ITaskItemProps) => {
    const [editingTask, setEditingTask] = useState(false);
    const [editText, setEditText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        toggleCompleted(taskId);
    };
    const handleClickDelete = () => {
        deleteTask(taskId);
    };
    // при клике ставим текущий текст
    const handleStartEdit = () => {
        setEditText(text);
        setEditingTask(true);
    };
    // сохранение текста задачи
    const handleSaveEdit = () => {
        if (editText.trim() !== "") {
            editTask(taskId, editText.trim());
        }
        setEditingTask(false);
    };
    // отмена сохранения
    const handleCanCelEdit = () => {
        setEditText("");
        setEditingTask(false);
    };
    // делаем фокус на input при редактировании
    useEffect(() => {
        if (editingTask && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingTask]);

    return (
        <li className="task-list__item">
            <div className="task-list__content">
                <label className="task-list__checkbox-label">
                    <input
                        type="checkbox"
                        className="task-list__checkbox"
                        // checked={isCheck}
                        onChange={handleChange}
                    />
                    <span className="task-list__custom-checkbox"></span>
                </label>
                <div className="task-list__details">
                    {editingTask ? (
                        <input
                            ref={inputRef}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            type="text"
                            name="Edit"
                            placeholder="Edit text"
                        />
                    ) : (
                        <span
                            className={`task-list__text ${
                                completed ? "task-list__text--completed" : ""
                            }`}
                        >
                            {text}
                        </span>
                    )}
                </div>
            </div>

            {editingTask ? (
                <>
                    <TaskButton
                        className="task-list__edit"
                        icon={<IconSave />}
                        onClickIcon={handleSaveEdit}
                    />
                    <TaskButton
                        className="task-list__delete"
                        icon={<IconCancel />}
                        onClickIcon={handleCanCelEdit}
                    />
                </>
            ) : (
                <>
                    <TaskButton
                        className="task-list__edit"
                        icon={<IconEdit />}
                        onClickIcon={handleStartEdit}
                    />
                    <TaskButton
                        className="task-list__delete"
                        icon={<IconDelete />}
                        onClickIcon={handleClickDelete}
                    />
                </>
            )}
        </li>
    );
};

export default TaskItem;
